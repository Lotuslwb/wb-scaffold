function withData(param){
  return param < 10 ? '0' + param : '' + param;
}
function getLoopArray(start,end){
  var start = start || 0;
  var end = end || 1;
  var array = [];
  for (var i = start; i <= end; i++) {
    array.push(withData(i));
  }
  return array;
}

function timePicker(time) {
  // 返回默认显示的数组和联动数组的声明
  var dateTime = [], timeArray = [[],[]];
  // 默认开始显示数据
  var defaultTime = time ? [...time.split(':')] : ['00', '00'];
  // 处理联动列表数据
  /*分秒*/
  timeArray[0] = getLoopArray(0, 59);
  timeArray[1] = getLoopArray(0, 59);

  timeArray.forEach((current,index) => {
    dateTime.push(current.indexOf(defaultTime[index]));
  });

  return {
    timeArray: timeArray,
    dateTime: dateTime
  }
}
export default timePicker;