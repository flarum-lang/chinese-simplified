# Flarum 简体中文语言包

## Simplified Chinese Language Pack

[![许可证](https://img.shields.io/packagist/l/flarum-lang/chinese-simplified.svg?label=许可证)](https://raw.githubusercontent.com/flarum-lang/chinese-simplified/2.x/LICENSE) [![Flarum](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fflarum-lang%2Fchinese-simplified%2F1.x%2Fcomposer.json&query=%24.require%5B%22flarum%2Fcore%22%5D&label=Flarum)](https://docs.flarum.org/1.x/) [![最新版本](https://img.shields.io/github/v/tag/flarum-lang/chinese-simplified?filter=v1.*&sort=semver&label=最新版本)](https://github.com/flarum-lang/chinese-simplified/releases) [![Flarum](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fflarum-lang%2Fchinese-simplified%2F2.x%2Fcomposer.json&query=%24.require%5B%22flarum%2Fcore%22%5D&label=Flarum)](https://docs.flarum.org/2.x/) [![最新版本](https://img.shields.io/github/v/tag/flarum-lang/chinese-simplified?filter=v2.*&sort=semver&label=最新版本)](https://github.com/flarum-lang/chinese-simplified/releases) [![发布日期](https://img.shields.io/github/release-date/flarum-lang/chinese-simplified.svg?display_date=published_at&label=发布日期)](https://github.com/flarum-lang/chinese-simplified/releases/latest) [![总下载量](https://img.shields.io/packagist/dt/flarum-lang/chinese-simplified.svg?label=总下载量)](https://packagist.org/packages/flarum-lang/chinese-simplified/stats) [![月下载量](https://img.shields.io/packagist/dm/flarum-lang/chinese-simplified.svg?label=月下载量)](https://packagist.org/packages/flarum-lang/chinese-simplified/stats)

本语言包基于 [flarum/lang-english](https://github.com/flarum/lang-english)、[jsthon 2015](https://discuss.flarum.org/d/612) 和 [Csineneo 2019](https://github.com/Csineneo/lang-simplified-chinese)。

Based on [flarum/lang-english](https://github.com/flarum/lang-english), [jsthon 2015](https://discuss.flarum.org/d/612) and [Csineneo Pack 2019](https://github.com/Csineneo/lang-simplified-chinese).

整体语言风格较细腻自然，符合多数中国人思维习惯。

繁体中文语言包请查阅此处：[繁体中文语言包](https://discuss.flarum.org/d/17954)。

## 要求 / Require

| Flarum | 语言包版本 | 分支     |
|--------|------------|----------|
| 2.x    | `2.x`      | `2.x`    |
| 1.x    | `1.x`      | `master` |

## 安装 / Install

通过 Composer：

```
composer require "flarum-lang/chinese-simplified:*"
php flarum cache:clear
```

_**Flarum 旧版本（v1.1.1 及以下）**_

- 在末尾写上版本号即可安装指定的语言包版本：`composer require flarum-lang/chinese-simplified:^1.1.1`，语言包版本号与 Flarum 版本号相同。

**_Flarum Beta 16 及以下请翻阅语言包历史版本号_**

## 升级、卸载 / Update & Remove

将安装命令中的 `require` 替换为 `update` 或 `remove`

## [支持的扩展 / Supported Extensions](https://rob006-software.github.io/flarum-translations/flarum2/status/zh_Hans.html) ↗️

## 报告问题 / Report Issue

- [Github](https://github.com/flarum-lang/chinese-simplified/issues)
- [中文社区](https://discuss.flarum.org.cn/d/1211)

## 链接 / Links

- [Github](https://github.com/flarum-lang/chinese-simplified)
- [Packagist](https://packagist.org/packages/flarum-lang/chinese-simplified)
- [Discuss](https://discuss.flarum.org/d/22690)
- [Discuss in Chinese](https://discuss.flarum.org.cn/d/1211)

## 贡献 / Contribute

> 借 Flarum 2.0 的契机，我们对语言包进行了重新梳理。
>
> 2.x 调整了部分 1.x 的翻译约定，例如将「主题」改为「讨论」，具体原因之后会说明。

- [2.0 约定与术语表](https://discuss.flarum.org.cn/d/16540)
- [术语表](https://weblate.rob006.net/browse/flarum/glossary/zh_Hans/?q=)

为尽量保证文案的统一性，请阅读以下规范后再前往[翻译平台](https://weblate.rob006.net/languages/zh_Hans/flarum2/?limit=500)参与贡献。

贡献时请以对应版本的翻译约定和术语表为准，并结合实际使用场景斟酌措辞。

- [UI 文案原则](https://www.uisdc.com/ui-copy-design-method#)
- [中英文混排规范 W3](https://www.w3.org/TR/clreq/#chinese_and_western_mixed_text_composition)
- [混排指北](https://github.com/sparanoid/chinese-copywriting-guidelines/blob/master/README.zh-CN.md)
