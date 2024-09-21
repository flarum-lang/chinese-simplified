import ExtensionPage from 'flarum/admin/components/ExtensionPage'
import Link from 'flarum/common/components/Link';
import Stream from 'flarum/common/utils/Stream';
import Switch from 'flarum/common/components/Switch';

export default class NoticePage extends ExtensionPage {
  getKey(key) {
    return `flarum-lang-chinese-simplified.${key}`;
  }
  oninit(vnode) {
    super.oninit(vnode);

    this.settings[this.getKey('use_google_fonts')] = Stream(app.data.settings[this.getKey('use_google_fonts')] === '1');
    this.settings[this.getKey('reformat_time')] = Stream(app.data.settings[this.getKey('reformat_time')] === '1');
    this.settings[this.getKey('reformat_time_force')] = Stream(app.data.settings[this.getKey('reformat_time_force')] === '1');
  }
  content(){
    return (
      <div className="zh-Hans ExtensionPage-settings">
        <div className="container Form">
          <div className="section Notice-Page">
            <div className="Form-group">
              <label><i class="fas fa-info-circle"></i> 提示</label>
              <p>您已开启中文语言包，如需使中文作为 Flarum 的默认语言，请前往<Link
                href={app.route('basics')}>「常规」</Link>页面设置。</p>
            </div>
            <div className="Form-group">
              <label><i class="fas fa-language"></i> 贡献</label>
              <p>如果您对翻译有更好的建议或纠错，欢迎到 <a
                href="https://weblate.rob006.net/languages/zh_Hans/flarum/"
                target="_blank">翻译平台 <i
                class="fas fa-external-link-alt"></i></a> 提交您的宝贵意见。</p>
            </div>
          </div>
          <hr/>
          <div className="section">
            <h3>高级设置</h3>
            <div className="Form-group">
              <Switch state={this.settings[this.getKey('use_google_fonts')]()} onchange={this.settings[this.getKey('use_google_fonts')]}>
                优化字体
              </Switch>
              <div className="helpText">使用谷歌 Noto Sans SC 字体切片，在兼顾加载速度的同时，优化<b>非移动设备</b>上的文字展示效果。</div>
            </div>
            <div className="Form-group">
              <Switch state={this.settings[this.getKey('reformat_time')]()}
                      onchange={this.settings[this.getKey('reformat_time')]}>
                优化日期格式
              </Switch>
              <div className="helpText">将部分格式颠倒的中文日期重新格式化成正确的顺序。</div>
            </div>
            <div className="Form-group">
              <Switch state={this.settings[this.getKey('reformat_time_force')]()}
                      onchange={this.settings[this.getKey('reformat_time_force')]}>
                增强日期格式优化
              </Switch>
              <div className="helpText">极具侵入性的日期格式调整方案，可能会误伤某些日期展示效果（灵感来自<a href="https://discuss.flarum.org.cn/u/zxypp" target="_blank">@小鱼飘飘</a>）。</div>
            </div>
            <div className="Form-group">{this.submitButton()}</div>
          </div>
        </div>
      </div>
    )
  }
}
