import type Mithril from 'mithril';

import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Form from 'flarum/common/components/Form';
import Icon from 'flarum/common/components/Icon';
import Link from 'flarum/common/components/Link';

export default class NoticePage extends ExtensionPage {
  content(): Mithril.Vnode {
    return (
      <div className="zh-Hans ExtensionPage-settings">
        <div className="container">
          <Form className="section Notice-Page">
            <div className="Form-group">
              <label>
                <Icon name="fas fa-info-circle" /> 提示
              </label>
              <p>
                你已启用中文语言包，如需使中文作为 Flarum 的默认语言，请前往
                <Link href={app.route('basics')}>「常规」</Link>页面设置。
              </p>
            </div>
            <div className="Form-group">
              <label>
                <Icon name="fas fa-language" /> 贡献
              </label>
              <p>
                如果您对翻译有更好的建议或纠错，欢迎到
                <Link
                  href="https://weblate.rob006.net/languages/zh_Hans/flarum2/"
                  external
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  翻译平台
                </Link>
                提交您的宝贵意见。
              </p>
            </div>
          </Form>
          <Form className="section" label="高级设置">
            {this.buildSettingComponent({
              setting: 'flarum-lang-chinese-simplified.use_google_fonts',
              type: 'boolean',
              label: '优化字体',
              help: '使用语言包随附的 Noto Sans SC 字体切片，在兼顾加载速度的同时，优化非移动设备上的文字展示效果。保存后刷新页面生效。',
            })}
            <div className="Form-group Form-controls">{this.submitButton()}</div>
          </Form>
        </div>
      </div>
    );
  }
}
