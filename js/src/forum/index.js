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

    if(isZhHans && reformatTime && this.stream.discussion.payload) {
      this.stream.loadPromise.then(() => {
        const index = this.stream.index.toFixed(0) - 1;
        // const index = this.stream.targetPost.index || 0;
        const id = this.stream.discussion.payload.data.relationships.posts.data[index]['id'];
        const post = this.stream.discussion.store.data.posts[id];
        const time = post.data.attributes.createdAt;
        this.stream.description = dayjs(time).format('YYYY年MMM');
      })
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
