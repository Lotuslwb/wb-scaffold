// components/tag.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tag: {
      type: null,
      value: ''
    },
    text: {
      type: String,
      value: ''
    },
    // tag是否可关闭
    closable: {
      type: Boolean,
      value: true
    },
    size: {
      type: String,
      value: 'default'
    }
  },

  attached: function() {

  },
  /**
   * 组件的初始数据
   */
  data: {},
  /**
   * 组件的方法列表
   */
  methods: {
    closeTag: function(e) {
      this.triggerEvent('deleteTag', { tag: e.currentTarget.dataset.value });
    }
  }
});
