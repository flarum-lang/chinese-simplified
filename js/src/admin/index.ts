import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import LinkButton from 'flarum/common/components/LinkButton';
import { extend } from 'flarum/common/extend';

import NoticePage from './NoticePage';

app.initializers.add('flarum-lang-chinese-simplified', (app) => {
  // Register extension settings page
  app.registry.for('flarum-lang-chinese-simplified').registerPage(NoticePage);

  extend(ExtensionPage.prototype, 'infoItems', function (items) {
    items.add(
      'flarum-lang-chinese-simplified-extensions-hub',
      LinkButton.component(
        {
          href: `https://discuss.flarum.org.cn/extensions/${this.extension.name}`,
          icon: 'fas fa-puzzle-piece',
          external: true,
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        '扩展中心'
      ),
      Math.min(0, ...Object.values(items.toObject()).map((item) => item.priority)) - 1
    );
  });
});
