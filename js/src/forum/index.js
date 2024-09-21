import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';
import PostStream from 'flarum/forum/components/PostStream';
function getKey(key) {
  return `flarum-lang-chinese-simplified.${key}`;
}

app.initializers.add('flarum-lang/chinese-simplified', () => {
  const isZhHans = app.data.locale === 'zh-Hans'

  // 调整侧边栏日期
  override(PostStream.prototype, 'updateScrubber', function (original, ...args) {
    const reformatTime = app.forum.data.attributes[getKey('reformat_time')];

    original(...args);

    if(isZhHans && reformatTime) {
      this.stream.description = dayjs(this.stream.description).format('YYYY年MMM');
    }
  });

  override(dayjs.prototype, 'format', function (original, format, ...args) {
    const reformatTimeForce = app.forum.data.attributes[getKey('reformat_time_force')];

    if(reformatTimeForce && isZhHans) {
      return format === 'D MMM' ? original('MMMD日', ...args) : original(format, ...args)
    } else {
      return original(format, ...args);
    }
  });
});
