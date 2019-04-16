//index.js
//获取应用实例

import regeneratorRuntime, {
  async
} from '../../plugins/regenerator-runtime/runtime';
const app = getApp();

Page({
  data: {
    // currentCategory: 123,
    currentCategoryIndex: 0,
    categories: [],
  },
  onLoad: async function() {
    // TODO 修改接口
    const { list, mobile } = await app.HttpService.helpList({}).then(
      res => res.data
    );
    // 所有项目默认是展开
    const categories = list.map(item => {
      return {
        ...item,
        questions: item.questions.map(q => {
          return {
            ...q,
            open: true,
          }
        })
      }
    })
    // list.map(item => (item.open = true));
    this.setData({
      categories,
      mobile
    });
  },
  makephone: function(e) {
    const tel = e.currentTarget.dataset.tel;
    wx.makePhoneCall({
      phoneNumber: tel
    });
  },
  toggle: function(e) {
    const { index } = e.currentTarget.dataset;
    const { categories, currentCategoryIndex } = this.data;
    const copyData = categories[currentCategoryIndex];
    copyData.questions[index].open = !copyData.questions[index].open;
    this.setData({
      categories: {
        ...categories,
        [currentCategoryIndex]: copyData
      }
    });
  },
  changeCategory: function(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      currentCategoryIndex: index,
    })
  }
});
