## Flarum 简体中文语言包 / Simplified Chinese Language Pack
本语言包基于 [flarum/lang-english](https://github.com/flarum/lang-english) 、 [Flarum China](https://discuss.flarum.org/d/612)，并对[Csineneo 的简中语言包](https://github.com/Csineneo/lang-simplified-chinese)言语进行了优化调整。

相较于 Csineneo 的语言包，整体语言风格较细腻自然，符合多数中国人思维习惯。

This language pack is based on [flarum/lang-english](https://github.com/flarum/lang-english),[Flarum China](https://discuss.flarum.org/d/612), and optimized a lot of speech descriptions of [Csineneo's Simplified Chinese Language Pack](https://github.com/Csineneo/lang-simplified-chinese).

Compared with Csineneo's Simplified Chinese language pack, the overall language style is more delicate and natural, which conforms to the thinking habits of most Chinese people.

繁体中文语言包请查阅此处：[正体中文语言包](https://discuss.flarum.org/d/17954)。

### 要求 / Requirement
  - Flarum v0.1.0-beta.8 及以上版本

### 安装 / Installation
```
composer require littlegolden/flarum-lang-simplified-chinese
```

### 升级 / Update
```
composer update littlegolden/flarum-lang-simplified-chinese
```

### 卸载 / Remove
```
composer remove littlegolden/flarum-lang-simplified-chinese
```

### 清理缓存 / Cache Clear
```
php flarum cache:clear
```

### 本地化 / Localization
  - 调整时间格式

### 支持的扩展 / Supported Extensions
<details>
<summary>展开详情</summary>

  - amaurycarrade-syndication（[Syndication extension](https://discuss.flarum.org/d/4395)）
  - antoinefr-money（[Money extension](https://discuss.flarum.org/d/4699)）
  - antoinefr-online（[Online users extension](https://discuss.flarum.org/d/8302)）
  - askvortsov-auth-sync（[Flarum Auth Sync](https://discuss.flarum.org/d/22759)）
  - askvortsov-saml（[Flarum SAML](https://discuss.flarum.org/d/22757)）
  - backtowebsite（[Back to Website Button](https://discuss.flarum.org/d/18285)）
  - clarkwinkelmann-author-change（[Discussion and post author change](https://discuss.flarum.org/d/21731)）
  - clarkwinkelmann-create-user-modal（[Create User Modal](https://discuss.flarum.org/d/22608)）
  - clarkwinkelmann-email-as-display-name（[Email as Display Name](https://discuss.flarum.org/d/22603)）
  - clarkwinkelmann-emojionearea（[Emoji Picker](https://discuss.flarum.org/d/4787)）
  - clarkwinkelmann-passwordless（[Passwordless login](https://discuss.flarum.org/d/22606)）
  - clarkwinkelmann-post-date（[Change post date](https://discuss.flarum.org/d/21247)）
  - clarkwinkelmann-status（[User status](https://discuss.flarum.org/d/21983)）
  - datitisev-dashboard（[Datitisev Admin Dashboard](https://discuss.flarum.org/d/2958)）
  - dem13n-nickname-changer（[NickName Changer](https://discuss.flarum.org/d/21238)）
  - dem13n-quad-theme（[Quad theme](https://discuss.flarum.org/d/22618)）
  - extiverse-bazaar（[Bazaar extension marketplace](https://discuss.flarum.org/d/5151)）
  - fajuu-contactbutton（[Contact Button](https://discuss.flarum.org/d/18228)）
  - fajuu-icons（[Icons by Fajuu](https://discuss.flarum.org/d/21401)）
  - flagrow-ads（[Flagrow Ads](https://discuss.flarum.org/d/4785)）
  - flagrow-analytics（[Flagrow analytics extension](https://discuss.flarum.org/d/1983)）
  - flagrow-fonts（[Flagrow Fonts](https://discuss.flarum.org/d/6207)）
  - flagrow-html-errors（[Custom HTML Error Pages](https://discuss.flarum.org/d/10784)）
  - flagrow-impersonate（[Flagrow Impersonate](https://discuss.flarum.org/d/9868)）
  - ~~flagrow-mason（[Flagrow Mason](https://discuss.flarum.org/d/7028)）~~ Not compatible with the latest version.
  - flagrow-passport（[Flagrow passport](https://discuss.flarum.org/d/5203)）
  - flarum-akismet（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-approval（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-auth-facebook（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-auth-github（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-auth-twitter（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-core（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-discussion-views（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-emoji（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-ext-close（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-ext-fancybox（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-flags（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-likes（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-lock（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-markdown（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-mentions（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - ~~flarum-notify（[Notify](https://discuss.flarum.org/d/4345)）~~ Incompatible
  - flarum-pusher（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-statistics（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-sticky（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-subscriptions（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-suspend（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - flarum-tags（[Flarum Core](https://github.com/flarum/lang-english/tree/master/locale)）
  - fof-amazon-affiliation（[Amazon Affiliation](https://discuss.flarum.org/d/12389)）
  - fof-auth-gitlab（[GitLab Login](https://discuss.flarum.org/d/20371)）
  - fof-auth-discord（[Discord Login](https://discuss.flarum.org/d/20184)）
  - fof-ban-ips（[Ban IPs](https://discuss.flarum.org/d/20949)）
  - fof-best-answer（[Best Answer](https://discuss.flarum.org/d/21894)）
  - fof-byobu（[Byōbu](https://discuss.flarum.org/d/4762)）
  - fof-custom-footer（[Custom Footer](https://discuss.flarum.org/d/17774)）
  - fof-default-group（[Default Group](https://discuss.flarum.org/d/18158)）
  - fof-drafts（[Drafts](https://discuss.flarum.org/d/20957)）
  - fof-email-checker（[Disposable Emails](https://discuss.flarum.org/d/20457)）
  - fof-follow-tags（[Follow Tags](https://discuss.flarum.org/d/20525)）
  - fof-formatting（[Formatting](https://discuss.flarum.org/d/17770-friendsofflarum-formatting/111)）
  - fof-forum-statistics-widget（[Statistics Widget](https://discuss.flarum.org/d/22380)）
  - fof-frontpage（[FrontPage](https://discuss.flarum.org/d/19256)）
  - fof-gamification（[Gamification](https://discuss.flarum.org/d/20671-friendsofflarum-gamification)）
  - fof-geoip（[GeoIP](https://discuss.flarum.org/d/21493)）
  - fof-ignore-users（[Ignore Users](https://discuss.flarum.org/d/20681)）
  - fof-linguist（[Linguist](https://discuss.flarum.org/d/7026)）
  - fof-links（[Links](https://discuss.flarum.org/d/18335)）
  - fof-masquerade（[Masquerade by FriendsOfFlarum](https://discuss.flarum.org/d/5791)）
  - fof-merge-discussions（[Masquerade](https://discuss.flarum.org/d/5791)）
  - fof-moderator-notes（[Moderator Notes](https://discuss.flarum.org/d/22925)）
  - fof-nightmode（[Night Mode](https://discuss.flarum.org/d/21492)）
  - fof-open-collective（[Open Collective](https://discuss.flarum.org/d/22256)）
  - fof-pages（[Pages](https://discuss.flarum.org/d/18301)）
  - fof-polls（[Polls](https://discuss.flarum.org/d/20586)）
  - fof-pretty-mail（[Pretty Mail](https://discuss.flarum.org/d/11178)）
  - fof-prevent-necrobumping（[Prevent Necrobumping](https://discuss.flarum.org/d/18312)）
  - fof-pwned-passwords（[Pwned Passwords](https://discuss.flarum.org/d/18348)）
  - fof-reactions（[Reactions](https://discuss.flarum.org/d/20655)）
  - fof-recaptcha（[reCAPTCHA](https://discuss.flarum.org/d/18399)）
  - fof-secure-https（[Secure HTTPS](https://discuss.flarum.org/d/17771)）
  - fof-sentry（[Sentry](https://discuss.flarum.org/d/18089-friendsofflarum-sentry/34)）
  - fof-share-social（[Share Social](https://discuss.flarum.org/d/20401)）
  - fof-socialprofile（[Social Profile](https://discuss.flarum.org/d/18775)）
  - fof-spamblock（[Spamblock](https://discuss.flarum.org/d/17772)）
  - fof-stopforumspam（[StopForumSpam](https://discuss.flarum.org/d/17846)）
  - fof-split（[Split](https://discuss.flarum.org/d/1903)）
  - fof-subscribed（[Subscribed](https://discuss.flarum.org/d/20917)）
  - fof-terms（[Terms](https://discuss.flarum.org/d/11714)）
  - fof-transliterator（[URL Transliterator](https://discuss.flarum.org/d/18074)）
  - fof-upload（[FoF upload](https://discuss.flarum.org/d/4154)）
  - fof-user-directory（[User directory](https://discuss.flarum.org/d/5682)）
  - fof-userbio（[User Bio](https://discuss.flarum.org/d/17775)）
  - fof-username-request（[Username Request](https://discuss.flarum.org/d/20956)）
  - imgur-upload（[Imgur Upload](https://discuss.flarum.org/d/18491)）
  - kilowhat-affiliation-links（[Multi-Purpose Affiliation Links Generator](https://discuss.flarum.org/d/21833)）
  - kilowhat-mailing（[Mailing](https://discuss.flarum.org/d/20443)）
  - kvothe-sub（[Sign Up Button](https://discuss.flarum.org/d/18812)）
  - maicol07-sso（[Single Sign On (SSO)](https://discuss.flarum.org/d/21666)）
  - michaelBelgium-profile-views（[Profile views](https://discuss.flarum.org/d/7596)）
  - migratetoflarum-canonical（[Canonical url redirect](https://discuss.flarum.org/d/19307)）
  - migratetoflarum-fake-data（[Fake Data](https://discuss.flarum.org/d/21160)）
  - migratetoflarum-vbulletin-redirects（[vbulletin Redirects](https://github.com/migratetoflarum/vbulletin-redirects)）
  - minr-auth-qq（[QQ Login](https://github.com/minr/flarum-ext-auth-qq）
  - mybbtoflarum（[MyBB to flarum](https://discuss.flarum.org/d/5506)）
  - nikovonlas-webpush（[OneSignal web push notifications](https://discuss.flarum.org/d/20784)）
  - nomiscz-auth-linkedin（[LinkedIn Auth](https://discuss.flarum.org/d/20263)）
  - nomiscz-auth-steam（[Steam Auth](https://discuss.flarum.org/d/19750)）
  - nomiscz-auth-wechat（[WeChat Login](https://discuss.flarum.org/d/6038)）
  - perspective（[Perspective API](https://discuss.flarum.org/d/21784)）
  - pushedx-chat（[Realtime chat with Pusher (Alpha)](https://discuss.flarum.org/d/5133-wip-extension-realtime-chat-with-pusher/12)）
  - reflar-cookie-consent（[Cookie Consent](https://discuss.flarum.org/d/10395)）
  - reflar-doorman（[Doorman](https://discuss.flarum.org/d/17845)）
  - reflar-level-ranks（[Levels Ranks](https://discuss.flarum.org/d/15052)）
  - reflar-twofactor（[Two Factor](https://discuss.flarum.org/d/11006)）
  - reflar-webhooks（[Webhooks](https://discuss.flarum.org/d/17812)）
  - saleksin-auth-google（[Google Login](https://discuss.flarum.org/d/18250)）
  - shriker-pronouns（[Personal Pronouns](https://discuss.flarum.org/d/21188)）
  - simonxeko/follow-users（[Follow Users (WIP)](https://discuss.flarum.org/d/22628)）
  - simonxeko-preview-discussion（[Preview Discussion Post (WIP)](https://discuss.flarum.org/d/22636)）
  - sycho-profile-cover（[Profile Cover](https://github.com/SychO9/flarum-profile-cover)）
  - the-turk-diff（[Diff for Flarum](https://discuss.flarum.org/d/22779)）
  - the-turk-mathren（[MathRen](https://discuss.flarum.org/d/22439)）
  - the-turk-edit-notifications（[Edit Notifications](https://discuss.flarum.org/d/22896)）
  - the-turk-password-strength（[Password Strength Indicator](https://discuss.flarum.org/d/22624)）
  - therealsujitk（[Show Password](https://discuss.flarum.org/d/22727)）
  - tituspijean-auth-ldap（[LDAP Login](https://discuss.flarum.org/d/9515)）
  - tpokorra-post-notification（[Post Notifications per E-Mail](https://discuss.flarum.org/d/20750)）
  - v17development-flarum-seo（[Flarum SEO](https://discuss.flarum.org/d/18316)）
  - xmugenx-post-blacklist（[Post Blacklist](https://discuss.flarum.org/d/21750)）
  - zerosonesfun-announce（[Announce](https://discuss.flarum.org/d/21651)）
  
</details>

### 示例 / Demo
  - https://bbs.csur.fun/

### 报告问题 / Report Issue
  - [Github](https://github.com/Littlegolden/flarum-lang-simplified-chinese/issues)
  - [bbs.csur.fun](https://bbs.csur.fun/)

### 链接 / Links
  - [Flarum](https://discuss.flarum.org/d/22690)
  - [Github](https://github.com/Littlegolden/flarum-lang-simplified-chinese)
  - [Packagist](https://packagist.org/packages/littlegolden/flarum-lang-simplified-chinese)
  - [Flagrow](https://flagrow.io/extensions/littlegolden/flarum-lang-simplified-chinese)

### 捐赠 / Donate
请我喝杯咖啡 \^_\^

  - [Donate](https://pay.csur.fun)
