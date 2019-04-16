// components/tag.js
const app = getApp();
import timePicker from '../../../js/dateTimePicker';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time: {
      type: String,
      value: ''
    }
  },

  attached: function() {
    const { timeArray, dateTime } = timePicker(this.data.time);
    this.setData({
      timeArray,
      dateTime,
      test: dateTime,
    });
  },
  /**
   * 组件的初始数据
   */
  data: {
    timeArray: [],
    dateTime: []
  },
  // observers: {
  //   time: function(time) {
  //     // 在 numberA 或者 numberB 被设置时，执行这个函数
  //     const { timeArray, dateTime } = timePicker(this.data.time);
  //     this.setData({
  //       timeArray,
  //       dateTime
  //     });
  //   }
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    changeDateTime(e) {
      const { timeArray } = this.data;
      const multiIndex = e.detail.value;
      const dateTimeText = timeArray.map((item, index) => item[multiIndex[index]]);
      this.setData({
        test: multiIndex
      });
      this.triggerEvent('updateTime', { time: dateTimeText.join(':') });
    }
    // changeDateTimeColumn(e) {
    //   const { timeArray } = this.data;
    //   let arr = this.data.dateTime;
    //   arr[e.detail.column] = timeArray[e.detail.column][e.detail.value];
    //   this.setData({
    //     dateTime: arr
    //   });
    //   // this.triggerEvent('updateTime', { time: arr.join(':') });
    // }
  }
});
