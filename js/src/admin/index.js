import app from 'flarum/admin/app';
import NoticePage from './NoticePage'

app.initializers.add('flarum-lang/chinese-simplified', (app) => {

  // Register extension settings page
  app.extensionData
  .for('flarum-lang-chinese-simplified')
  .registerPage(NoticePage);

});
