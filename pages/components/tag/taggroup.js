// components/tag.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tags: {
      type: Array,
      value: []
    },
    texts: {
      type: Array,
      value: []
    },
    size: {
      type: String,
      value: 'default'
    },
    // 是否可以添加新的tag
    canAdd: {
      type: Boolean,
      value: true
    }
  },

  attached: function() {

  },
  /**
   * 组件的初始数据
   */
  data: {
    // texts: []
  },
  /**
   * 组件的方法列表
   */
  methods: {
    handleDeleteTag: function(e) {
      const { tag } = e.detail;

      const result = this.data.tags.filter(item => {
        if (typeof item == 'string') {
          return item != tag;
        }
        return item.text != tag.text;
      });
      // this.getTexts(result);
      this.triggerEvent('updateTag', { tags: result });
    },
    handleAddTag: function(e) {
      const { tag } = e.detail;
      let { tags } = this.data;
      if (tag && tags.indexOf(tag) === -1) {
        const copyData = [...tags, tag];
        this.setData({
          tags: copyData,
          texts: copyData,
        });
        this.triggerEvent('updateTag', { tags: copyData });
        // this.updateTag(copyData);
      }
    }
  },
  updateTag: function(tags) {
    this.triggerEvent('updateTag', { tags });
  }
});
