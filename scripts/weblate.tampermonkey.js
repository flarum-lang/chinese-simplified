// ==UserScript==
// @name         Weblate 页面进度与审阅助手
// @namespace    http://tampermonkey.net/
// @version      2026-10-02.1
// @description  显示 Weblate 页面进度，并提供本地审阅标记、备注、导航与备份
// @author       ChatGPT, Golden
// @match        https://weblate.rob006.net/languages/zh_Hans/flarum/
// @match        https://weblate.rob006.net/languages/zh_Hans/flarum2/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=rob006.net
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  window.addEventListener('load', async () => {
    const ROW_SELECTOR = '.tab-pane.active > table.table-listing > tbody > tr';
    const PAGE_KEY = location.pathname.replace(/\/+$/, '');
    const scrollStorageKey = `jmjdt-top:${PAGE_KEY}`;
    const collapsedStorageKey = 'ymjdt-collapsed';
    const sortStorageKey = `ymjdt-table-sort:${PAGE_KEY}`;
    const lastReviewedStorageKey = `ymjdt-last-reviewed:${PAGE_KEY}`;

    /*
     * 没有保存过排序偏好时，默认使用 Weblate 原生的 Component ↓。
     * columnIndex 是在所有 .sort-cell 中的索引，仅作为列名匹配失败时的兜底。
     */
    const DEFAULT_SORT = {
      column: 'Component',
      columnIndex: 0,
      direction: 'down',
    };

    const DB_NAME = 'weblate-review-helper';
    const DB_VERSION = 1;
    const STORE_NAME = 'reviews';

    const EPSILON = 0.01;

    let currentFilter = null;
    let currentReviewRow = null;
    let currentModalRow = null;
    let scrollFrame = null;
    let reviewCache = new Map();
    let persistentStorage = false;
    let dbPromise = null;
    let reviewSaveInProgress = false;

    const style = document.createElement('style');
    style.textContent = `
            #ymjdt {
                position: fixed;
                top: 0;
                left: 0;
                z-index: 99999;
                display: flex;
                align-items: center;
                gap: 7px;
                padding: 4px 8px;
                background: rgba(25, 25, 25, 0.94);
                color: #fff;
                font-size: 13px;
                line-height: 22px;
                white-space: nowrap;
                border-radius: 0 0 6px 0;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
                user-select: none;
            }

            #ymjdt-scroll {
                min-width: 62px;
            }

            #ymjdt .ymjdt-separator { opacity: 0.35; }
            #ymjdt .ymjdt-clickable { cursor: pointer; }
            #ymjdt .ymjdt-clickable:hover { text-decoration: underline; }
            #ymjdt .ymjdt-clickable.ymjdt-active { text-decoration: underline; font-weight: 700; }

            #ymjdt-approved { color: #5bc0de; }
            #ymjdt-translated { color: #5cb85c; }
            #ymjdt-pending { color: #f0ad4e; }
            #ymjdt-incomplete { color: #d9534f; }
            #ymjdt-local-reviewed { color: #8bd28b; }
            #ymjdt-changed { color: #ffca68; }

            #ymjdt button {
                border: 0;
                border-radius: 4px;
                padding: 1px 6px;
                background: rgba(255, 255, 255, 0.12);
                color: inherit;
                font: inherit;
                line-height: 20px;
                cursor: pointer;
            }

            #ymjdt button:hover:not(:disabled) { background: rgba(255, 255, 255, 0.22); }
            #ymjdt button:disabled { opacity: 0.4; cursor: default; }
            #ymjdt.ymjdt-collapsed .ymjdt-detail { display: none; }

            /*
             * 当前高亮组件的“完成审阅”按钮。
             *
             * 按钮由 JS 定位在组件左侧；如果左侧空间不足，
             * 会退到组件内部左上方，避免跑出浏览器视口。
             */
            #ymjdt-review {
                position: fixed;
                z-index: 100000;
                box-sizing: border-box;
                border: 1px solid #d99a28;
                border-radius: 5px;
                padding: 4px 8px;
                background: #f0ad4e;
                color: #fff;
                font-size: 12px;
                line-height: 18px;
                white-space: nowrap;
                cursor: pointer;
                box-shadow: 0 2px 7px rgba(0, 0, 0, 0.20);
            }

            #ymjdt-review[hidden] {
                display: none;
            }

            #ymjdt-review:hover:not(:disabled) {
                background: #ec971f;
            }

            #ymjdt-review:disabled {
                opacity: 0.6;
                cursor: default;
            }

            #ymjdt-review.ymjdt-review-inside {
                opacity: 0.94;
            }

            tr.ymjdt-component { scroll-margin-top: 40px; }

            body.ymjdt-filter-pending tr.ymjdt-component:not(.ymjdt-pending) { opacity: 0.18; }
            body.ymjdt-filter-incomplete tr.ymjdt-component:not(.ymjdt-incomplete) { opacity: 0.18; }

            body.ymjdt-filter-pending tr.ymjdt-component.ymjdt-pending > td {
                box-shadow: inset 4px 0 #f0ad4e;
            }

            body.ymjdt-filter-incomplete tr.ymjdt-component.ymjdt-incomplete > td {
                box-shadow: inset 4px 0 #d9534f;
            }

            /* 当前选中的名称行 + 进度行融合成一个整体 */
            tr.ymjdt-review-current-name > td,
            tr.ymjdt-review-current-progress > td {
                background: rgba(240, 173, 78, 0.12) !important;
            }

            tr.ymjdt-review-current-name > td { border-top: 2px solid #f0ad4e !important; }
            tr.ymjdt-review-current-progress > td {
                border-top: 0 !important;
                border-bottom: 2px solid #f0ad4e !important;
            }

            tr.ymjdt-review-current-name > td:first-child,
            tr.ymjdt-review-current-progress > td:first-child {
                border-left: 4px solid #f0ad4e !important;
            }

            tr.ymjdt-review-current-name > td:last-child,
            tr.ymjdt-review-current-progress > td:last-child {
                border-right: 2px solid #f0ad4e !important;
            }

            tr.ymjdt-review-current-name .object-link > a { font-weight: 600; }

            .ymjdt-review-badge {
                display: inline-block;
                margin-left: 7px;
                padding: 0 5px;
                border-radius: 10px;
                font-size: 11px;
                line-height: 18px;
                vertical-align: 1px;
                cursor: pointer;
                text-decoration: none !important;
            }

            .ymjdt-review-badge-done {
                background: rgba(92, 184, 92, 0.16);
                color: #3c763d;
            }

            .ymjdt-review-badge-changed {
                background: rgba(240, 173, 78, 0.18);
                color: #8a6d3b;
            }

            #ymjdt-modal {
                position: fixed;
                inset: 0;
                z-index: 100001;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                background: rgba(0, 0, 0, 0.45);
            }

            #ymjdt-modal[hidden] { display: none; }

            #ymjdt-modal-dialog {
                width: min(560px, calc(100vw - 40px));
                padding: 18px;
                border-radius: 8px;
                background: #fff;
                color: #333;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
            }

            #ymjdt-modal-title {
                margin: 0 0 6px;
                font-size: 18px;
            }

            #ymjdt-modal-component {
                margin-bottom: 4px;
                font-weight: 600;
            }

            #ymjdt-modal-status,
            #ymjdt-modal-time {
                margin-bottom: 8px;
                color: #777;
                font-size: 12px;
            }

            #ymjdt-modal label {
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
            }

            #ymjdt-note {
                box-sizing: border-box;
                width: 100%;
                min-height: 110px;
                resize: vertical;
                padding: 8px 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
                font: inherit;
            }

            #ymjdt-modal-actions {
                display: flex;
                justify-content: flex-end;
                gap: 8px;
                margin-top: 14px;
            }

            #ymjdt-modal-actions button {
                border: 1px solid #ccc;
                border-radius: 5px;
                padding: 6px 11px;
                background: #fff;
                color: #333;
                cursor: pointer;
            }

            #ymjdt-modal-actions #ymjdt-modal-save {
                border-color: #4cae4c;
                background: #5cb85c;
                color: #fff;
            }

            #ymjdt-modal-actions #ymjdt-modal-save.ymjdt-loading {
                opacity: 0.78;
                cursor: wait;
            }

            #ymjdt-modal[aria-busy="true"] #ymjdt-modal-dialog {
                cursor: wait;
            }

            #ymjdt-modal-actions #ymjdt-modal-unmark {
                margin-right: auto;
                border-color: #d9534f;
                color: #d9534f;
            }

            /*
             * 组件链接右键菜单。
             * 普通右击由脚本接管；Shift + 右击保留浏览器原生菜单。
             */
            #ymjdt-link-menu {
                position: fixed;
                z-index: 100003;
                min-width: 190px;
                padding: 4px;
                border: 1px solid rgba(0, 0, 0, 0.16);
                border-radius: 6px;
                background: #fff;
                color: #333;
                box-shadow: 0 6px 22px rgba(0, 0, 0, 0.22);
                font-size: 13px;
                line-height: 20px;
                user-select: none;
            }

            #ymjdt-link-menu[hidden] {
                display: none;
            }

            #ymjdt-link-menu button {
                display: block;
                box-sizing: border-box;
                width: 100%;
                padding: 6px 9px;
                border: 0;
                border-radius: 4px;
                background: transparent;
                color: inherit;
                font: inherit;
                text-align: left;
                white-space: nowrap;
                cursor: pointer;
            }

            #ymjdt-link-menu button:hover,
            #ymjdt-link-menu button:focus {
                outline: none;
                background: rgba(0, 0, 0, 0.07);
            }

            .object-link a:focus {
                text-decoration: underline;
                color: red;
            }
            #ymjdt-import-file {
                display: none;
            }
        `;
    document.head.append(style);

    const container = document.createElement('div');
    container.id = 'ymjdt';
    container.innerHTML = `
            <span id="ymjdt-scroll">滚动 0%</span>
            <span class="ymjdt-separator">|</span>

            <span id="ymjdt-components" class="ymjdt-clickable"
                title="组件总数 / 100% 已批准组件数 / 100% 已翻译组件数。点击清除筛选。">组件 0/0/0</span>
            <span class="ymjdt-separator ymjdt-detail">|</span>

            <span id="ymjdt-approved" class="ymjdt-detail" title="Weblate 100% 已批准组件占比">全批准 0%</span>
            <span class="ymjdt-separator ymjdt-detail">|</span>

            <span id="ymjdt-translated" class="ymjdt-detail" title="Weblate 100% 已翻译组件占比">全翻译 0%</span>
            <span class="ymjdt-separator ymjdt-detail">|</span>

            <span id="ymjdt-current" class="ymjdt-detail" title="当前浏览到的组件">当前 0/0</span>
            <span class="ymjdt-separator ymjdt-detail">|</span>

            <span id="ymjdt-pending" class="ymjdt-clickable ymjdt-detail"
                title="尚未 100% 批准，且没有有效本地审阅标记的组件。点击高亮。">待审 0</span>
            <span class="ymjdt-separator ymjdt-detail">|</span>

            <span id="ymjdt-incomplete" class="ymjdt-clickable ymjdt-detail"
                title="尚未达到 100% 翻译。点击高亮。">未译完 0</span>
            <span class="ymjdt-separator ymjdt-detail">|</span>

            <span id="ymjdt-local-reviewed" class="ymjdt-detail"
                title="Weblate 未 100% 批准，但你已手动确认且之后未发生变化的组件">本地完成 0</span>

            <span id="ymjdt-changed-wrap" class="ymjdt-detail">
                <span class="ymjdt-separator">|</span>
                <span id="ymjdt-changed" title="手动确认后，Weblate 进度又发生变化的组件">有变化 0</span>
            </span>

            <span class="ymjdt-separator ymjdt-detail">|</span>
            <button id="ymjdt-prev" class="ymjdt-detail" type="button">← 上一待审</button>
            <button id="ymjdt-next" class="ymjdt-detail" type="button">下一待审 →</button>

            <span class="ymjdt-separator ymjdt-detail">|</span>
            <button id="ymjdt-export" class="ymjdt-detail" type="button">导出</button>
            <button id="ymjdt-import" class="ymjdt-detail" type="button">导入</button>
            <input id="ymjdt-import-file" type="file" accept="application/json,.json" hidden>

            <button id="ymjdt-collapse" type="button" title="折叠/展开">−</button>
        `;
    document.body.append(container);

    /*
     * “完成审阅”不放在左上角工具条中，
     * 而是作为独立浮动按钮跟随当前高亮组件。
     */
    const reviewButton = document.createElement('button');
    reviewButton.id = 'ymjdt-review';
    reviewButton.type = 'button';
    reviewButton.textContent = '✓ 完成审阅';
    reviewButton.hidden = true;
    document.body.append(reviewButton);

    /*
     * 组件名称链接的自定义右键菜单。
     */
    const linkContextMenu = document.createElement('div');
    linkContextMenu.id = 'ymjdt-link-menu';
    linkContextMenu.hidden = true;
    linkContextMenu.innerHTML = `
            <button id="ymjdt-copy-open-en" type="button">复制链接并打开英文</button>
        `;
    document.body.append(linkContextMenu);

    const copyOpenEnglishButton = linkContextMenu.querySelector('#ymjdt-copy-open-en');
    let linkContextTarget = null;

    const modal = document.createElement('div');
    modal.id = 'ymjdt-modal';
    modal.hidden = true;
    modal.innerHTML = `
            <div id="ymjdt-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="ymjdt-modal-title">
                <h3 id="ymjdt-modal-title">标记为已完成审阅</h3>
                <div id="ymjdt-modal-component"></div>
                <div id="ymjdt-modal-status"></div>
                <div id="ymjdt-modal-time"></div>

                <label for="ymjdt-note">备注（可选）</label>
                <textarea id="ymjdt-note"
                    placeholder="例如：上游原文有问题，暂不批准；已人工核对，无需达到 100% 批准。"></textarea>

                <div id="ymjdt-modal-actions">
                    <button id="ymjdt-modal-unmark" type="button" hidden>取消已审阅</button>
                    <button id="ymjdt-modal-cancel" type="button">取消</button>
                    <button id="ymjdt-modal-save" type="button">✓ 保存并标记</button>
                </div>
            </div>
        `;
    document.body.append(modal);

    const scrollElement = document.querySelector('#ymjdt-scroll');
    const componentsElement = document.querySelector('#ymjdt-components');
    const approvedElement = document.querySelector('#ymjdt-approved');
    const translatedElement = document.querySelector('#ymjdt-translated');
    const currentElement = document.querySelector('#ymjdt-current');
    const pendingElement = document.querySelector('#ymjdt-pending');
    const incompleteElement = document.querySelector('#ymjdt-incomplete');
    const localReviewedElement = document.querySelector('#ymjdt-local-reviewed');
    const changedElement = document.querySelector('#ymjdt-changed');
    const changedWrapElement = document.querySelector('#ymjdt-changed-wrap');
    const prevButton = document.querySelector('#ymjdt-prev');
    const nextButton = document.querySelector('#ymjdt-next');
    const exportButton = document.querySelector('#ymjdt-export');
    const importButton = document.querySelector('#ymjdt-import');
    const importFileInput = document.querySelector('#ymjdt-import-file');
    const collapseButton = document.querySelector('#ymjdt-collapse');

    const modalTitle = document.querySelector('#ymjdt-modal-title');
    const modalComponent = document.querySelector('#ymjdt-modal-component');
    const modalStatus = document.querySelector('#ymjdt-modal-status');
    const modalTime = document.querySelector('#ymjdt-modal-time');
    const noteInput = document.querySelector('#ymjdt-note');
    const modalUnmarkButton = document.querySelector('#ymjdt-modal-unmark');
    const modalCancelButton = document.querySelector('#ymjdt-modal-cancel');
    const modalSaveButton = document.querySelector('#ymjdt-modal-save');

    function hideLinkContextMenu() {
      linkContextMenu.hidden = true;
      linkContextTarget = null;
    }

    function positionLinkContextMenu(clientX, clientY) {
      linkContextMenu.hidden = false;
      linkContextMenu.style.left = `${clientX}px`;
      linkContextMenu.style.top = `${clientY}px`;

      const rect = linkContextMenu.getBoundingClientRect();
      const margin = 6;

      const left = Math.min(
        Math.max(margin, clientX),
        Math.max(margin, window.innerWidth - rect.width - margin)
      );

      const top = Math.min(
        Math.max(margin, clientY),
        Math.max(margin, window.innerHeight - rect.height - margin)
      );

      linkContextMenu.style.left = `${left}px`;
      linkContextMenu.style.top = `${top}px`;
    }

    function getEnglishComponentUrl(anchor) {
      const url = new URL(anchor.href, location.href);

      /*
       * Weblate 组件语言页形如：
       * /projects/.../zh_Hans/
       *
       * 仅替换独立的语言路径段，避免误改其他字符串。
       */
      const englishPath = url.pathname.replace(
        /\/zh_Hans(?=\/|$)/,
        '/en'
      );

      if (englishPath === url.pathname) {
        return null;
      }

      url.pathname = englishPath;
      return url.href;
    }

    async function copyTextToClipboard(text) {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }

      /*
       * Clipboard API 不可用时的兼容方案。
       */
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '0';
      document.body.append(textarea);
      textarea.select();

      const copied = document.execCommand('copy');
      textarea.remove();

      if (!copied) {
        throw new Error('浏览器拒绝了剪贴板写入');
      }
    }

    function openEnglishAndCopyCurrentLink(anchor) {
      const currentUrl = new URL(anchor.href, location.href).href;
      const englishUrl = getEnglishComponentUrl(anchor);

      if (!englishUrl) {
        alert('无法从该组件链接识别 /zh_Hans/ 语言路径，未打开英文页面。');
        return;
      }

      /*
       * 先发起复制，再立即打开新标签页。
       * 不 await，避免异步等待导致 window.open 被浏览器当作弹窗拦截。
       */
      copyTextToClipboard(currentUrl).catch((error) => {
        console.error('[Weblate Review Helper] Copy link failed:', error);
        alert(`复制链接失败：${error.message || error}`);
      });

      window.open(englishUrl, '_blank', 'noopener');
    }

    function openDb() {
      if (dbPromise) {
        return dbPromise;
      }

      dbPromise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id' });
          }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      return dbPromise;
    }

    function transactionDone(transaction) {
      return new Promise((resolve, reject) => {
        transaction.oncomplete = () => resolve();
        transaction.onerror = () => reject(transaction.error);
        transaction.onabort = () => reject(transaction.error || new Error('IndexedDB transaction aborted'));
      });
    }

    async function getAllReviewRecords() {
      const db = await openDb();
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      const done = transactionDone(transaction);
      const records = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });

      await done;
      return records;
    }

    async function putReviewRecord(record) {
      const db = await openDb();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const done = transactionDone(transaction);
      transaction.objectStore(STORE_NAME).put(record);
      await done;
    }

    async function deleteReviewRecord(id) {
      const db = await openDb();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const done = transactionDone(transaction);
      transaction.objectStore(STORE_NAME).delete(id);
      await done;
    }

    async function putReviewRecords(records) {
      const db = await openDb();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const done = transactionDone(transaction);
      const store = transaction.objectStore(STORE_NAME);
      records.forEach((record) => store.put(record));
      await done;
    }

    async function loadReviewCache() {
      const records = await getAllReviewRecords();
      reviewCache = new Map(records.map((record) => [record.id, record]));
    }

    async function requestPersistentStorage() {
      try {
        if (!navigator.storage?.persist) {
          return false;
        }

        if (navigator.storage.persisted && await navigator.storage.persisted()) {
          return true;
        }

        return await navigator.storage.persist();
      } catch (error) {
        console.warn('[Weblate Review Helper] Persistent storage request failed:', error);
        return false;
      }
    }

    function getProgressWidth(row, selector) {
      const element = row.querySelector(selector);
      if (!element) {
        return 0;
      }

      const styleWidth = parseFloat(element.style.width);
      if (Number.isFinite(styleWidth)) {
        return styleWidth;
      }

      const ariaValue = parseFloat(element.getAttribute('aria-valuenow'));
      return Number.isFinite(ariaValue) ? ariaValue : 0;
    }

    function getProgressMeta(row, selector) {
      const element = row.querySelector(selector);
      if (!element) {
        return '';
      }

      return [
        element.style.width || '',
        element.getAttribute('aria-valuenow') || '',
        element.getAttribute('aria-label') || '',
        element.getAttribute('title') || '',
        element.getAttribute('data-original-title') || '',
      ].join('~');
    }

    function getProgressSnapshot(row) {
      const info = getProgressWidth(row, '.progress-bar-info');
      const success = getProgressWidth(row, '.progress-bar-success');
      const danger = getProgressWidth(row, '.progress-bar-danger');

      const signature = [
        info.toFixed(4),
        success.toFixed(4),
        danger.toFixed(4),
        getProgressMeta(row, '.progress-bar-info'),
        getProgressMeta(row, '.progress-bar-success'),
        getProgressMeta(row, '.progress-bar-danger'),
        (row.textContent || '').replace(/\s+/g, ' ').trim(),
      ].join('|');

      return { info, success, danger, signature };
    }

    function isComplete(value) {
      return value >= 100 - EPSILON;
    }

    function formatPercent(value) {
      return `${value.toFixed(1).replace(/\.0$/, '')}%`;
    }

    function getComponentRows() {
      return [...document.querySelectorAll(ROW_SELECTOR)].filter((row) => {
        return row.querySelector('.progress-bar-info, .progress-bar-success, .progress-bar-danger');
      });
    }

    function getNameRow(progressRow) {
      return progressRow.previousElementSibling;
    }

    function getComponentIdentity(progressRow) {
      const nameRow = getNameRow(progressRow);
      const anchor = nameRow?.querySelector('.object-link > a');
      const componentName = anchor?.textContent?.trim() || nameRow?.textContent?.replace(/\s+/g, ' ').trim() || '未知组件';

      let componentKey = componentName;
      let componentHref = '';

      if (anchor?.href) {
        const url = new URL(anchor.href, location.href);
        componentKey = url.pathname.replace(/\/+$/, '');
        componentHref = url.pathname + url.search;
      }

      return {
        id: `${PAGE_KEY}::${componentKey}`,
        page: PAGE_KEY,
        componentKey,
        componentName,
        componentHref,
      };
    }

    function hasSnapshotChanged(savedSnapshot, currentSnapshot) {
      if (!savedSnapshot) {
        return true;
      }

      if (savedSnapshot.signature && currentSnapshot.signature) {
        return savedSnapshot.signature !== currentSnapshot.signature;
      }

      return (
        Math.abs((savedSnapshot.info ?? 0) - currentSnapshot.info) > EPSILON ||
        Math.abs((savedSnapshot.success ?? 0) - currentSnapshot.success) > EPSILON ||
        Math.abs((savedSnapshot.danger ?? 0) - currentSnapshot.danger) > EPSILON
      );
    }

    /*
     * 一个手动审阅记录可以接受多个快照。
     *
     * 典型场景：
     * 1. 列表页打开时组件还是 100% 未翻译；
     * 2. 在另一个标签页完成翻译；
     * 3. 回到没有刷新的旧列表页点击“完成审阅”。
     *
     * 此时“当前列表页快照”和“服务器最新快照”不同，但两者都发生在
     * 用户点击完成审阅之前，因此都应该被视为这次审阅已经覆盖的状态。
     */
    function hasReviewSnapshotChanged(review, currentSnapshot) {
      if (!review) {
        return true;
      }

      if (!hasSnapshotChanged(review.snapshot, currentSnapshot)) {
        return false;
      }

      if (
        currentSnapshot.signature &&
        Array.isArray(review.acceptedSignatures) &&
        review.acceptedSignatures.includes(currentSnapshot.signature)
      ) {
        return false;
      }

      return true;
    }

    /*
     * 从服务器重新获取当前语言组件列表，并读取指定组件的最新进度。
     *
     * 这样即便当前标签页因为在后台没有刷新，保存审阅记录时也不会只记录
     * 页面里已经过期的红/绿/蓝进度条。
     */
    async function fetchFreshComponentSnapshot(identity) {
      const response = await fetch(location.href, {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`刷新组件进度失败：HTTP ${response.status}`);
      }

      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');

      const rows = [...doc.querySelectorAll('table.table-listing > tbody > tr')].filter((row) => {
        return row.querySelector('.progress-bar-info, .progress-bar-success, .progress-bar-danger');
      });

      const target = rows.find((progressRow) => {
        const nameRow = progressRow.previousElementSibling;
        const anchor = nameRow?.querySelector('.object-link > a');

        if (!anchor) {
          return false;
        }

        try {
          const url = new URL(anchor.getAttribute('href') || anchor.href, location.href);
          return url.pathname.replace(/\/+$/, '') === identity.componentKey;
        } catch {
          return false;
        }
      });

      if (!target) {
        throw new Error(`刷新组件进度失败：未在最新页面中找到 ${identity.componentName}`);
      }

      return getProgressSnapshot(target);
    }

    function getComponentStatus(progressRow) {
      const snapshot = getProgressSnapshot(progressRow);
      const identity = getComponentIdentity(progressRow);
      const review = reviewCache.get(identity.id) || null;

      const approved = isComplete(snapshot.info);
      // 第一列数值是 Weblate 的已翻译百分比，包含尚未批准的翻译。
      // 蓝绿进度条各自截取一位小数，相加可能只有 99.9%，不能用于判断是否译完。
      const translatedPercent = parseFloat(
        getNameRow(progressRow)?.querySelector('td.number[data-value]')?.getAttribute('data-value')
      );
      const incomplete = Number.isFinite(translatedPercent)
        ? translatedPercent < 100
        : snapshot.danger > 0;
      const translated = !incomplete;

      // 100% 批准时以 Weblate 为准，本地记录不需要参与待审判断。
      const changed = Boolean(review && !approved && hasReviewSnapshotChanged(review, snapshot));
      const manualReviewed = Boolean(review && !approved && !changed);

      // 待审 = Weblate 未 100% 批准，并且没有“仍有效”的本地审阅确认。
      const pending = !approved && !manualReviewed;

      return {
        ...snapshot,
        identity,
        review,
        approved,
        translated,
        incomplete,
        changed,
        manualReviewed,
        pending,
      };
    }

    function getReviewBadgeHost(nameRow) {
      return nameRow?.querySelector('.object-link') || nameRow?.querySelector('td');
    }

    function syncReviewBadge(progressRow, status) {
      const nameRow = getNameRow(progressRow);
      const host = getReviewBadgeHost(nameRow);
      if (!host) {
        return;
      }

      let badge = host.querySelector('.ymjdt-review-badge');

      if (!status.review || status.approved) {
        badge?.remove();
        return;
      }

      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'ymjdt-review-badge';
        host.append(badge);

        badge.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          currentReviewRow = progressRow;
          highlightReviewRow(progressRow);
          updateReviewButton();
          openReviewModal(progressRow);
        });
      }

      const desiredText = status.changed ? '↻ 已变化' : '✓ 已审阅';
      if (badge.textContent !== desiredText) {
        badge.textContent = desiredText;
      }

      badge.classList.toggle('ymjdt-review-badge-done', !status.changed);
      badge.classList.toggle('ymjdt-review-badge-changed', status.changed);

      const note = status.review.note ? `\n备注：${status.review.note}` : '';
      const reviewedAt = status.review.reviewedAt ? `\n标记时间：${new Date(status.review.reviewedAt).toLocaleString()}` : '';
      badge.title = `${status.changed ? '标记后 Weblate 进度发生了变化，需要重新确认' : '已由本地审阅标记视为完成'}${note}${reviewedAt}`;
    }

    function markComponentRows(rows) {
      rows.forEach((progressRow) => {
        const status = getComponentStatus(progressRow);
        const nameRow = getNameRow(progressRow);

        progressRow.classList.add('ymjdt-component');
        progressRow.classList.toggle('ymjdt-approved', status.approved);
        progressRow.classList.toggle('ymjdt-translated', status.translated);
        progressRow.classList.toggle('ymjdt-pending', status.pending);
        progressRow.classList.toggle('ymjdt-incomplete', status.incomplete);
        progressRow.classList.toggle('ymjdt-manual-reviewed', status.manualReviewed);
        progressRow.classList.toggle('ymjdt-review-changed', status.changed);

        if (nameRow) {
          nameRow.classList.toggle('ymjdt-manual-reviewed', status.manualReviewed);
          nameRow.classList.toggle('ymjdt-review-changed', status.changed);
        }

        syncReviewBadge(progressRow, status);
      });
    }

    function updateComponentStats() {
      const rows = getComponentRows();
      markComponentRows(rows);

      const total = rows.length;
      let approved = 0;
      let translated = 0;
      let pending = 0;
      let incomplete = 0;
      let localReviewed = 0;
      let changed = 0;

      rows.forEach((row) => {
        const status = getComponentStatus(row);
        if (status.approved) approved++;
        if (status.translated) translated++;
        if (status.pending) pending++;
        if (status.incomplete) incomplete++;
        if (status.manualReviewed) localReviewed++;
        if (status.changed) changed++;
      });

      const approvedPercent = total > 0 ? approved / total * 100 : 0;
      const translatedPercent = total > 0 ? translated / total * 100 : 0;

      componentsElement.textContent = `组件 ${total}/${approved}/${translated}`;
      approvedElement.textContent = `全批准 ${formatPercent(approvedPercent)}`;
      translatedElement.textContent = `全翻译 ${formatPercent(translatedPercent)}`;
      pendingElement.textContent = `待审 ${pending}`;
      incompleteElement.textContent = `未译完 ${incomplete}`;
      localReviewedElement.textContent = `本地完成 ${localReviewed}`;
      changedElement.textContent = `有变化 ${changed}`;
      changedWrapElement.hidden = changed === 0;

      prevButton.disabled = pending === 0;
      nextButton.disabled = pending === 0;

      updateCurrentComponent();
      updateReviewButton();
    }

    function updateScrollProgress() {
      const documentElement = document.documentElement;
      const scrollTop = window.scrollY || documentElement.scrollTop || 0;
      const maxScroll = documentElement.scrollHeight - documentElement.clientHeight;
      const progress = maxScroll > 0 ? Math.min(100, Math.max(0, scrollTop / maxScroll * 100)) : 100;

      scrollElement.textContent = `滚动 ${formatPercent(progress)}`;
      localStorage.setItem(scrollStorageKey, String(scrollTop));
    }

    function getCurrentComponentIndex(rows) {
      if (!rows.length) {
        return -1;
      }

      const readingLine = container.getBoundingClientRect().bottom + 8;
      const index = rows.findIndex((row) => row.getBoundingClientRect().bottom > readingLine);
      return index === -1 ? rows.length - 1 : index;
    }

    function updateCurrentComponent() {
      const rows = getComponentRows();
      if (!rows.length) {
        currentElement.textContent = '当前 0/0';
        return;
      }

      const index = getCurrentComponentIndex(rows);
      currentElement.textContent = `当前 ${index + 1}/${rows.length}`;
    }

    function setFilter(filter, toggle = true) {
      if (toggle && currentFilter === filter) {
        filter = null;
      }

      currentFilter = filter;
      document.body.classList.remove('ymjdt-filter-pending', 'ymjdt-filter-incomplete');
      pendingElement.classList.remove('ymjdt-active');
      incompleteElement.classList.remove('ymjdt-active');

      if (filter === 'pending') {
        document.body.classList.add('ymjdt-filter-pending');
        pendingElement.classList.add('ymjdt-active');
      } else if (filter === 'incomplete') {
        document.body.classList.add('ymjdt-filter-incomplete');
        incompleteElement.classList.add('ymjdt-active');
      }
    }

    function clearCurrentHighlight() {
      document.querySelectorAll('.ymjdt-review-current-name, .ymjdt-review-current-progress').forEach((element) => {
        element.classList.remove('ymjdt-review-current-name', 'ymjdt-review-current-progress');
      });

      reviewButton.hidden = true;
    }

    function positionReviewButton() {
      if (!currentReviewRow || !document.contains(currentReviewRow)) {
        reviewButton.hidden = true;
        return;
      }

      const nameRow = getNameRow(currentReviewRow);
      const nameRect = (nameRow || currentReviewRow).getBoundingClientRect();
      const progressRect = currentReviewRow.getBoundingClientRect();

      const componentTop = nameRect.top;
      const componentBottom = progressRect.bottom;
      const componentLeft = Math.min(nameRect.left, progressRect.left);

      /*
       * 当前高亮组件已经完全离开视口时不显示按钮。
       */
      if (componentBottom <= 0 || componentTop >= window.innerHeight) {
        reviewButton.hidden = true;
        return;
      }

      reviewButton.hidden = false;
      reviewButton.classList.remove('ymjdt-review-inside');

      /*
       * 先让浏览器完成按钮文字后的宽度计算。
       */
      const buttonRect = reviewButton.getBoundingClientRect();
      const gap = 8;

      let left = componentLeft - buttonRect.width - gap;

      /*
       * 默认垂直居中在“名称行 + 进度行”这个整体上。
       */
      let top =
        componentTop +
        (componentBottom - componentTop - buttonRect.height) / 2;

      /*
       * 左侧空间不足时，退到组件内部左上角。
       * 这样不会让按钮被浏览器边缘裁掉。
       */
      if (left < 4) {
        left = componentLeft + 8;
        top = componentTop + 6;
        reviewButton.classList.add('ymjdt-review-inside');
      }

      const maxTop = Math.max(4, window.innerHeight - buttonRect.height - 4);

      reviewButton.style.left = `${Math.max(4, left)}px`;
      reviewButton.style.top = `${Math.min(maxTop, Math.max(4, top))}px`;
    }

    function highlightReviewRow(progressRow) {
      clearCurrentHighlight();

      const nameRow = getNameRow(progressRow);
      nameRow?.classList.add('ymjdt-review-current-name');
      progressRow.classList.add('ymjdt-review-current-progress');

      currentReviewRow = progressRow;
      updateReviewButton();
      positionReviewButton();
    }

    function revealReviewRow(progressRow) {
      const nameRow = getNameRow(progressRow);
      const nameRect = nameRow ? nameRow.getBoundingClientRect() : progressRow.getBoundingClientRect();
      const progressRect = progressRow.getBoundingClientRect();

      const componentTop = nameRect.top;
      const componentBottom = progressRect.bottom;
      const viewportTop = container.getBoundingClientRect().bottom + 8;
      const viewportBottom = window.innerHeight - 8;

      // 已完整可见：完全不滚动。
      if (componentTop >= viewportTop && componentBottom <= viewportBottom) {
        return;
      }

      // 在下方：只滚动刚好让整个组件从底部出现。
      if (componentBottom > viewportBottom) {
        window.scrollBy({
          top: componentBottom - viewportBottom,
          behavior: 'smooth',
        });
        return;
      }

      // 在上方：只滚动刚好让名称行出现在固定栏下面。
      if (componentTop < viewportTop) {
        window.scrollBy({
          top: componentTop - viewportTop,
          behavior: 'smooth',
        });
      }
    }

    /*
     * 记住最后一次“成功保存审阅记录”的组件。
     *
     * 保存组件唯一 ID，而不是滚动像素。这样即使刷新后 Weblate
     * 按记忆的表头规则重新排序，仍然可以准确找到同一个组件。
     */
    function saveLastReviewedComponent(progressRow) {
      if (!progressRow || !document.contains(progressRow)) {
        return;
      }

      const identity = getComponentIdentity(progressRow);
      localStorage.setItem(lastReviewedStorageKey, identity.id);
    }

    /*
     * 排序恢复完成后，定位到最后一次审阅的组件。
     *
     * 滚动和高亮完全复用“上一待审 / 下一待审”的现有逻辑：
     * highlightReviewRow() + revealReviewRow()。
     */
    function restoreLastReviewedComponent() {
      const lastReviewedId = localStorage.getItem(lastReviewedStorageKey);
      if (!lastReviewedId) {
        return false;
      }

      const target = getComponentRows().find((row) => {
        return getComponentIdentity(row).id === lastReviewedId;
      });

      if (!target) {
        return false;
      }

      highlightReviewRow(target);
      revealReviewRow(target);
      return true;
    }

    function getPendingRows() {
      return getComponentRows().filter((row) => row.classList.contains('ymjdt-pending'));
    }

    function getVisiblePendingRows(pendingRows) {
      const viewportTop = container.getBoundingClientRect().bottom + 8;
      const viewportBottom = window.innerHeight - 8;

      return pendingRows.filter((row) => {
        const nameRow = getNameRow(row);
        const top = (nameRow || row).getBoundingClientRect().top;
        const bottom = row.getBoundingClientRect().bottom;
        return bottom > viewportTop && top < viewportBottom;
      });
    }

    function goToPending(direction) {
      const allRows = getComponentRows();
      const pendingRows = allRows.filter((row) => row.classList.contains('ymjdt-pending'));

      if (!pendingRows.length) {
        return;
      }

      let target = null;

      // 如果已经定位过组件，就以当前组件为锚点，即使它刚刚被手动标记为已完成而退出待审列表。
      if (currentReviewRow && allRows.includes(currentReviewRow)) {
        const currentIndex = allRows.indexOf(currentReviewRow);

        if (direction > 0) {
          target = allRows.slice(currentIndex + 1).find((row) => row.classList.contains('ymjdt-pending')) || pendingRows[0];
        } else {
          target = [...allRows.slice(0, currentIndex)].reverse().find((row) => row.classList.contains('ymjdt-pending')) || pendingRows[pendingRows.length - 1];
        }
      } else {
        const visibleRows = getVisiblePendingRows(pendingRows);

        if (visibleRows.length) {
          target = direction > 0 ? visibleRows[0] : visibleRows[visibleRows.length - 1];
        } else if (direction > 0) {
          const viewportBottom = window.innerHeight - 8;
          target = pendingRows.find((row) => getNameRow(row)?.getBoundingClientRect().top >= viewportBottom) || pendingRows[0];
        } else {
          const viewportTop = container.getBoundingClientRect().bottom + 8;
          target = [...pendingRows].reverse().find((row) => row.getBoundingClientRect().bottom <= viewportTop) || pendingRows[pendingRows.length - 1];
        }
      }

      highlightReviewRow(target);
      revealReviewRow(target);
    }

    function updateReviewButton() {
      if (reviewSaveInProgress) {
        reviewButton.hidden = false;
        reviewButton.disabled = true;
        reviewButton.textContent = '⏳ 保存中…';
        reviewButton.title = '正在获取最新进度并保存审阅记录';
        positionReviewButton();
        return;
      }

      if (!currentReviewRow || !document.contains(currentReviewRow)) {
        reviewButton.disabled = true;
        reviewButton.textContent = '✓ 完成审阅';
        reviewButton.title = '先用上一待审/下一待审选中一个组件';
        reviewButton.hidden = true;
        return;
      }

      reviewButton.hidden = false;

      const status = getComponentStatus(currentReviewRow);

      if (status.approved) {
        reviewButton.disabled = true;
        reviewButton.textContent = '✓ Weblate 已批准';
        reviewButton.title = '这个组件已经 100% 批准';
      } else if (status.changed) {
        reviewButton.disabled = false;
        reviewButton.textContent = '↻ 重新确认';
        reviewButton.title = '该组件在上次手动审阅后发生了变化，点击重新确认或编辑备注';
      } else if (status.manualReviewed) {
        reviewButton.disabled = false;
        reviewButton.textContent = '✓ 已审阅';
        reviewButton.title = '点击编辑备注或取消本地审阅标记';
      } else {
        reviewButton.disabled = false;
        reviewButton.textContent = '✓ 完成审阅';
        reviewButton.title = '将当前组件标记为已完成审阅，并可写备注';
      }

      /*
       * 按钮文字可能因状态变化而变宽，更新后重新计算位置。
       */
      positionReviewButton();
    }

    function openReviewModal(progressRow) {
      currentModalRow = progressRow;

      const status = getComponentStatus(progressRow);
      const review = status.review;

      if (status.changed) {
        modalTitle.textContent = '重新确认审阅';
        modalSaveButton.textContent = '↻ 更新并重新确认';
      } else if (review) {
        modalTitle.textContent = '编辑审阅记录';
        modalSaveButton.textContent = '✓ 保存';
      } else {
        modalTitle.textContent = '标记为已完成审阅';
        modalSaveButton.textContent = '✓ 保存并标记';
      }

      modalComponent.textContent = status.identity.componentName;
      modalStatus.textContent = `批准 ${formatPercent(status.info)} · 待批准翻译 ${formatPercent(status.success)} · 未翻译 ${formatPercent(status.danger)}`;
      modalTime.textContent = review?.reviewedAt
        ? `上次标记：${new Date(review.reviewedAt).toLocaleString()}${status.changed ? ' · 此后进度已发生变化' : ''}`
        : '';

      noteInput.value = review?.note || '';
      modalUnmarkButton.hidden = !review;

      /*
       * 确保上一次失败后遗留的禁用状态已经恢复。
       */
      setReviewSaveState(false);
      modal.hidden = false;

      requestAnimationFrame(() => noteInput.focus());
    }

    function setReviewSaveState(active, message = '正在保存…') {
      reviewSaveInProgress = active;

      modal.setAttribute('aria-busy', active ? 'true' : 'false');
      modalSaveButton.disabled = active;
      modalCancelButton.disabled = active;
      modalUnmarkButton.disabled = active;
      noteInput.disabled = active;

      modalSaveButton.classList.toggle('ymjdt-loading', active);

      if (active) {
        modalSaveButton.textContent = `⏳ ${message}`;

        /*
         * 浮动按钮也同步锁住，避免异步请求期间再次触发审阅操作。
         */
        reviewButton.disabled = true;
        reviewButton.textContent = '⏳ 保存中…';
        reviewButton.title = '正在获取最新进度并保存审阅记录';
        return;
      }

      /*
       * 恢复弹窗保存按钮的正常文案。
       */
      if (currentModalRow && document.contains(currentModalRow)) {
        const status = getComponentStatus(currentModalRow);

        if (status.changed) {
          modalSaveButton.textContent = '↻ 更新并重新确认';
        } else if (status.review) {
          modalSaveButton.textContent = '✓ 保存';
        } else {
          modalSaveButton.textContent = '✓ 保存并标记';
        }
      }

      updateReviewButton();
    }

    function closeReviewModal() {
      modal.hidden = true;
      currentModalRow = null;
    }

    async function saveCurrentReview() {
      if (reviewSaveInProgress) {
        return;
      }

      if (!currentModalRow || !document.contains(currentModalRow)) {
        closeReviewModal();
        return;
      }

      /*
       * 异步请求期间固定本次要保存的组件。
       */
      const reviewRow = currentModalRow;
      const status = getComponentStatus(reviewRow);
      const now = new Date().toISOString();
      const previous = status.review;

      setReviewSaveState(true, '正在获取最新进度…');

      /*
       * 当前 DOM 可能是旧的，例如用户在另一个标签页刚完成翻译后返回。
       * 保存前再从服务器获取一次最新列表进度。
       */
      const visibleSnapshot = getProgressSnapshot(reviewRow);
      let freshSnapshot = visibleSnapshot;

      try {
        freshSnapshot = await fetchFreshComponentSnapshot(status.identity);
      } catch (error) {
        /*
         * 网络失败不阻止用户完成审阅。
         * 仍保存当前页面快照；之后如果状态确实发生变化，会按原逻辑提示。
         */
        console.warn('[Weblate Review Helper] Failed to refresh component snapshot before review:', error);
      }

      /*
       * 同时接受“点击审阅时当前页面看到的状态”和“服务器最新状态”。
       *
       * 这解决了：
       * 全红组件 -> 新标签页翻译完成 -> 回旧列表标记 -> 刷新后标记失效
       * 的问题。
       */
      const acceptedSignatures = [
        visibleSnapshot.signature,
        freshSnapshot.signature,
      ].filter((signature, index, list) => {
        return Boolean(signature) && list.indexOf(signature) === index;
      });

      const record = {
        id: status.identity.id,
        page: status.identity.page,
        componentKey: status.identity.componentKey,
        componentName: status.identity.componentName,
        componentHref: status.identity.componentHref,
        note: noteInput.value.trim(),
        createdAt: previous?.createdAt || now,
        reviewedAt: now,
        snapshot: freshSnapshot,
        acceptedSignatures,
        schemaVersion: 2,
      };

      setReviewSaveState(true, '正在保存…');

      await putReviewRecord(record);
      reviewCache.set(record.id, record);

      /*
       * 只有真正成功写入 IndexedDB 后才更新“最后审阅组件”。
       */
      saveLastReviewedComponent(reviewRow);

      setReviewSaveState(false);
      closeReviewModal();
      updateComponentStats();

      if (currentReviewRow) {
        highlightReviewRow(currentReviewRow);
      }
    }

    async function unmarkCurrentReview() {
      if (!currentModalRow || !document.contains(currentModalRow)) {
        closeReviewModal();
        return;
      }

      const identity = getComponentIdentity(currentModalRow);
      await deleteReviewRecord(identity.id);
      reviewCache.delete(identity.id);

      closeReviewModal();
      updateComponentStats();

      if (currentReviewRow) {
        highlightReviewRow(currentReviewRow);
      }
    }

    async function exportReviews() {
      const records = await getAllReviewRecords();
      const payload = {
        schemaVersion: 1,
        source: 'weblate-review-helper',
        origin: location.origin,
        exportedAt: new Date().toISOString(),
        reviews: records,
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `weblate-review-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    }

    async function importReviews(file) {
      const text = await file.text();
      const payload = JSON.parse(text);
      const imported = Array.isArray(payload) ? payload : payload?.reviews;

      if (!Array.isArray(imported)) {
        throw new Error('备份文件中没有 reviews 数组');
      }

      const validImported = imported.filter((record) => {
        return record && typeof record.id === 'string' && record.snapshot && typeof record.snapshot === 'object';
      });

      const existing = new Map((await getAllReviewRecords()).map((record) => [record.id, record]));
      const toWrite = [];

      validImported.forEach((record) => {
        const old = existing.get(record.id);
        const oldTime = old?.reviewedAt ? Date.parse(old.reviewedAt) : 0;
        const newTime = record.reviewedAt ? Date.parse(record.reviewedAt) : 0;

        if (!old || newTime >= oldTime) {
          toWrite.push(record);
        }
      });

      if (toWrite.length) {
        await putReviewRecords(toWrite);
      }

      await loadReviewCache();
      updateComponentStats();

      alert(`导入完成：读取 ${validImported.length} 条记录，更新 ${toWrite.length} 条。`);
    }

    function updateStorageHint() {
      const state = persistentStorage
        ? '浏览器已授予持久化存储，可降低因存储空间压力被自动清理的风险。主动清除站点数据仍会删除 IndexedDB，请保留导出备份。'
        : '当前未确认获得持久化存储。IndexedDB 仍可正常使用，但建议定期导出备份。';

      exportButton.title = `导出全部本地审阅记录为 JSON。${state}`;
      importButton.title = '从 JSON 备份中合并审阅记录；同一组件保留标记时间更新的记录。';
      localReviewedElement.title = `Weblate 未 100% 批准，但你已手动确认且之后未发生变化的组件。${state}`;
    }

    function getSortableHeaders() {
      return [...document.querySelectorAll('thead.sticky-header th.sort-cell')];
    }

    function getSortColumnName(header) {
      return (header?.textContent || '').replace(/\s+/g, ' ').trim();
    }

    function getSortDirection(header) {
      const icon = header?.querySelector('.sort-icon');
      if (!icon) {
        return null;
      }

      if (icon.classList.contains('sort-down')) {
        return 'down';
      }

      if (icon.classList.contains('sort-up')) {
        return 'up';
      }

      return null;
    }

    function getCurrentTableSort() {
      const headers = getSortableHeaders();

      for (let index = 0; index < headers.length; index++) {
        const header = headers[index];
        const direction = getSortDirection(header);

        if (direction) {
          return {
            column: getSortColumnName(header),
            columnIndex: index,
            direction,
          };
        }
      }

      return null;
    }

    function saveCurrentTableSort() {
      const sort = getCurrentTableSort();
      if (!sort) {
        return;
      }

      localStorage.setItem(sortStorageKey, JSON.stringify(sort));
    }

    function loadTableSortPreference() {
      const saved = localStorage.getItem(sortStorageKey);
      if (!saved) {
        return { ...DEFAULT_SORT };
      }

      try {
        const parsed = JSON.parse(saved);
        const direction = parsed?.direction === 'up' ? 'up' : parsed?.direction === 'down' ? 'down' : null;

        if (!direction) {
          return { ...DEFAULT_SORT };
        }

        return {
          column: typeof parsed.column === 'string' ? parsed.column : DEFAULT_SORT.column,
          columnIndex: Number.isInteger(parsed.columnIndex) ? parsed.columnIndex : DEFAULT_SORT.columnIndex,
          direction,
        };
      } catch (error) {
        console.warn('[Weblate Review Helper] Invalid saved table sort preference:', error);
        return { ...DEFAULT_SORT };
      }
    }

    function findSortHeader(preference) {
      const headers = getSortableHeaders();

      const byName = headers.find((header) => {
        return getSortColumnName(header) === preference.column;
      });

      if (byName) {
        return byName;
      }

      return headers[preference.columnIndex] || headers[DEFAULT_SORT.columnIndex] || null;
    }

    function waitForSortUpdate() {
      return new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(resolve));
      });
    }

    async function applyTableSortPreference(preference = loadTableSortPreference()) {
      const header = findSortHeader(preference);
      if (!header) {
        return false;
      }

      /*
       * 完全交给 Weblate 原生排序器处理。
       * 最多点击三次：切换目标列 + 必要时反转方向。
       */
      for (let attempt = 0; attempt < 3; attempt++) {
        if (getSortDirection(header) === preference.direction) {
          return true;
        }

        header.click();
        await waitForSortUpdate();
      }

      return getSortDirection(header) === preference.direction;
    }

    function initializeTableSortMemory() {
      /*
       * 只记录用户真实点击。脚本调用 header.click() 时 isTrusted=false，
       * 因此恢复默认排序不会把中间状态误写回 localStorage。
       */
      document.addEventListener('click', (event) => {
        if (!event.isTrusted) {
          return;
        }

        const header = event.target.closest?.('thead.sticky-header th.sort-cell');
        if (!header) {
          return;
        }

        requestAnimationFrame(() => {
          requestAnimationFrame(saveCurrentTableSort);
        });
      });
    }

    function setCollapsed(collapsed) {
      container.classList.toggle('ymjdt-collapsed', collapsed);
      collapseButton.textContent = collapsed ? '+' : '−';
      collapseButton.title = collapsed ? '展开进度面板' : '折叠进度面板';
      localStorage.setItem(collapsedStorageKey, collapsed ? '1' : '0');
    }

    /*
     * 右击组件名称链接：显示“复制链接并打开英文”。
     * Shift + 右击则放行浏览器原生右键菜单。
     */
    document.addEventListener('contextmenu', (event) => {
      if (event.shiftKey) {
        hideLinkContextMenu();
        return;
      }

      const anchor = event.target.closest?.('.object-link > a');
      if (!anchor) {
        hideLinkContextMenu();
        return;
      }

      event.preventDefault();
      linkContextTarget = anchor;
      positionLinkContextMenu(event.clientX, event.clientY);
    });

    copyOpenEnglishButton.addEventListener('click', () => {
      const anchor = linkContextTarget;
      hideLinkContextMenu();

      if (!anchor || !document.contains(anchor)) {
        return;
      }

      openEnglishAndCopyCurrentLink(anchor);
    });

    document.addEventListener('pointerdown', (event) => {
      if (!linkContextMenu.hidden && !linkContextMenu.contains(event.target)) {
        hideLinkContextMenu();
      }
    });

    pendingElement.addEventListener('click', () => setFilter('pending'));
    incompleteElement.addEventListener('click', () => setFilter('incomplete'));
    componentsElement.addEventListener('click', () => setFilter(null, false));

    prevButton.addEventListener('click', () => goToPending(-1));
    nextButton.addEventListener('click', () => goToPending(1));
    reviewButton.addEventListener('click', () => {
      if (currentReviewRow) {
        openReviewModal(currentReviewRow);
      }
    });

    exportButton.addEventListener('click', () => {
      exportReviews().catch((error) => {
        console.error(error);
        alert(`导出失败：${error.message || error}`);
      });
    });

    importButton.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', async () => {
      const file = importFileInput.files?.[0];
      importFileInput.value = '';
      if (!file) {
        return;
      }

      try {
        await importReviews(file);
      } catch (error) {
        console.error(error);
        alert(`导入失败：${error.message || error}`);
      }
    });

    collapseButton.addEventListener('click', () => {
      setCollapsed(!container.classList.contains('ymjdt-collapsed'));
    });

    modalCancelButton.addEventListener('click', closeReviewModal);
    modalSaveButton.addEventListener('click', () => {
      if (reviewSaveInProgress) {
        return;
      }

      saveCurrentReview().catch((error) => {
        setReviewSaveState(false);
        console.error(error);
        alert(`保存审阅记录失败：${error.message || error}`);
      });
    });
    modalUnmarkButton.addEventListener('click', () => {
      unmarkCurrentReview().catch((error) => {
        console.error(error);
        alert(`取消审阅标记失败：${error.message || error}`);
      });
    });

    modal.addEventListener('click', (event) => {
      if (event.target === modal && !reviewSaveInProgress) {
        closeReviewModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (!modal.hidden && !reviewSaveInProgress) {
        closeReviewModal();
      }

      hideLinkContextMenu();
    });

    window.addEventListener('scroll', () => {
      hideLinkContextMenu();

      if (scrollFrame !== null) {
        return;
      }

      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = null;
        updateScrollProgress();
        updateCurrentComponent();
        positionReviewButton();
      });
    }, { passive: true });

    window.addEventListener('resize', () => {
      hideLinkContextMenu();
      updateScrollProgress();
      updateCurrentComponent();
      positionReviewButton();
    });

    const tabContent = document.querySelector('.tab-content');
    if (tabContent) {
      let updateTimer = null;
      const observer = new MutationObserver(() => {
        clearTimeout(updateTimer);
        updateTimer = setTimeout(updateComponentStats, 80);
      });

      observer.observe(tabContent, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'aria-valuenow'],
      });
    }

    setCollapsed(localStorage.getItem(collapsedStorageKey) === '1');
    initializeTableSortMemory();

    try {
      await loadReviewCache();
    } catch (error) {
      console.error('[Weblate Review Helper] Failed to load IndexedDB:', error);
      alert('本地审阅数据库加载失败，本次页面中的审阅标记可能无法保存。');
    }

    persistentStorage = await requestPersistentStorage();
    updateStorageHint();

    /*
     * 恢复上次用户选择的 Weblate 原生排序。
     * 第一次使用时默认 Component ↓。
     */
    await applyTableSortPreference();

    updateComponentStats();
    updateScrollProgress();
    updateCurrentComponent();

    /*
     * 排序完成后再恢复最后一次审阅组件。
     *
     * 定位行为直接复用上一待审 / 下一待审：
     * - 高亮名称行 + 进度行
     * - 已在视口内则不滚动
     * - 在视口外只进行最小必要滚动
     */
    const restoredLastReviewed = restoreLastReviewedComponent();

    /*
     * 没有保存过最后审阅组件，或组件已不存在时，
     * 才回退到旧版的滚动像素恢复逻辑。
     */
    if (!restoredLastReviewed) {
      const previousScrollTop = Number(
        localStorage.getItem(scrollStorageKey) ??
        localStorage.getItem('jmjdt-top') ??
        0
      );

      if (Number.isFinite(previousScrollTop) && previousScrollTop > 0) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            window.scrollTo({ top: previousScrollTop });
            updateScrollProgress();
            updateCurrentComponent();
          });
        });
      }
    }
  });
})();
