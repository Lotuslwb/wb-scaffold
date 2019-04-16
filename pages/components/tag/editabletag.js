// components/tag.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: ''
    },
  },

  attached: function() {
  },
  /**
   * 组件的初始数据
   */
  data: {
    inputVisible: false,
    inputValue: '',
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function () {
      this.setData({
        inputVisible: true,
      })
    },
    handleInputChange: function (e) {
      this.setData({
        inputValue: e.detail.value
      })
    },
    handleInputConfirm: function (e) {
      this.setData({
        inputVisible: false,
      })
      this.triggerEvent('addTag', { tag: this.data.inputValue });
    }
  }
});
