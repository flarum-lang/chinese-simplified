import app from 'flarum/admin/app';

import NoticePage from './NoticePage';

app.initializers.add('flarum-lang/chinese-simplified', (app) => {
  // Register extension settings page
  app.registry.for('flarum-lang-chinese-simplified').registerPage(NoticePage);
});
