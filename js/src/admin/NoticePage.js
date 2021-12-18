import ExtensionPage from 'flarum/admin/components/ExtensionPage'
import Link from 'flarum/common/components/Link';

export default class NoticePage extends ExtensionPage {
    content(){
        console.log('[ app.routes ] >', app.routes)
        return (
            <div className="ChineseNoticePage">
                <div className="Form-group">
                    <label><i class="fas fa-info-circle"></i> 提示</label>
                    <p>您已开启中文语言包，如需使中文作为 Flarum 的默认语言，请前往<Link href={app.route('basics')}>「常规」</Link>页面设置。</p>
                </div>
                <div className="Form-group">
                    <label><i class="fas fa-language"></i> 贡献</label>
                    <p>如果您对翻译有更好的建议或纠错，欢迎到 <a href="https://weblate.rob006.net/languages/zh_Hans/flarum/" target="_blank">翻译平台 <i class="fas fa-external-link-alt"></i></a> 提交您的宝贵意见。</p>
                </div>
            </div>
        )
    }
}
