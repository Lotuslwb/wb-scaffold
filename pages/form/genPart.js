var bodyStart = [29, 107];
var headStart = [0, 0];
var bodyMargin = [30, 44];
var headMargin = [67, 44];

var body = [
  {
    part_key: '103',
    part_name: '前肩部',
    width: 174,
    height: 37,
    left: 112,
    top: 217
  },
  {
    part_key: '104',
    part_name: '后肩部',
    width: 174,
    height: 34,
    left: 464,
    top: 220
  },
  {
    part_key: '105',
    part_name: '胸部左侧',
    width: 66,
    height: 133,
    left: 134,
    top: 250
  },
  {
    part_key: '106',
    part_name: '胸部右侧',
    width: 65,
    height: 133,
    left: 199,
    top: 250
  },
  {
    part_key: '107',
    part_name: '腹部',
    width: 131,
    height: 91,
    left: 134,
    top: 379
  },
  {
    part_key: '108',
    part_name: '背部',
    width: 131,
    height: 200,
    left: 485,
    top: 250
  },
  {
    part_key: '109',
    part_name: '臀部左侧',
    width: 69,
    height: 75,
    left: 482,
    top: 431
  },
  {
    part_key: '110',
    part_name: '臀部右侧',
    width: 69,
    height: 75,
    left: 550,
    top: 431
  },
  {
    part_key: '116',
    part_name: '男性外阴',
    width: 39,
    height: 42,
    left: 180,
    top: 458
  },
  {
    part_key: '201',
    part_name: '前左上臂',
    width: 39,
    height: 112,
    left: 261,
    top: 246
  },
  {
    part_key: '202',
    part_name: '后左上臂',
    width: 39,
    height: 112,
    left: 450,
    top: 246
  },
  {
    part_key: '203',
    part_name: '前右上臂',
    width: 39,
    height: 113,
    left: 99,
    top: 246
  },
  {
    part_key: '204',
    part_name: '后右上臂',
    width: 39,
    height: 113,
    left: 612,
    top: 246
  },
  {
    part_key: '205',
    part_name: '前左前臂',
    width: 61,
    height: 104,
    left: 270,
    top: 347
  },
  {
    part_key: '206',
    part_name: '后左前臂',
    width: 61,
    height: 104,
    left: 419,
    top: 347
  },
  {
    part_key: '207',
    part_name: '前右前臂',
    width: 61,
    height: 104,
    left: 68,
    top: 347
  },
  {
    part_key: '208',
    part_name: '后右前臂',
    width: 61,
    height: 104,
    left: 621,
    top: 347
  },
  {
    part_key: '209',
    part_name: '前左大腿',
    width: 65,
    height: 184,
    left: 203,
    top: 439
  },
  {
    part_key: '210',
    part_name: '后左大腿',
    width: 64,
    height: 138,
    left: 483,
    top: 496
  },
  {
    part_key: '211',
    part_name: '前右大腿',
    width: 65,
    height: 184,
    left: 131,
    top: 439
  },
  {
    part_key: '212',
    part_name: '后右大腿',
    width: 64,
    height: 138,
    left: 554,
    top: 496
  },
  {
    part_key: '213',
    part_name: '前左小腿',
    width: 50,
    height: 147,
    left: 208,
    top: 617
  },
  {
    part_key: '214',
    part_name: '后左小腿',
    width: 47,
    height: 136,
    left: 492,
    top: 628
  },
  {
    part_key: '215',
    part_name: '前右小腿',
    width: 49,
    height: 148,
    left: 141,
    top: 616
  },
  {
    part_key: '216',
    part_name: '后右小腿',
    width: 46,
    height: 136,
    left: 563,
    top: 628
  },
  {
    part_key: '217',
    part_name: '左手掌',
    width: 60,
    height: 81,
    left: 307,
    top: 442
  },
  {
    part_key: '218',
    part_name: '左手背',
    width: 60,
    height: 81,
    left: 383,
    top: 442
  },
  {
    part_key: '219',
    part_name: '右手掌',
    width: 59,
    height: 81,
    left: 32,
    top: 442
  },
  {
    part_key: '220',
    part_name: '右手背',
    width: 59,
    height: 81,
    left: 659,
    top: 442
  },
  {
    part_key: '221',
    part_name: '左脚背',
    width: 63,
    height: 62,
    left: 210,
    top: 762
  },
  {
    part_key: '222',
    part_name: '左脚底',
    width: 63,
    height: 62,
    left: 477,
    top: 762
  },
  {
    part_key: '223',
    part_name: '右脚背',
    width: 62,
    height: 62,
    left: 126,
    top: 762
  },
  {
    part_key: '224',
    part_name: '右脚底',
    width: 62,
    height: 62,
    left: 562,
    top: 762
  },
  {
    part_key: '302',
    part_name: '后脑',
    width: 73,
    height: 78,
    left: 514,
    top: 111
  },
  {
    part_key: '101',
    part_name: '前颈部',
    width: 53,
    height: 44,
    left: 173,
    top: 190
  },
  {
    part_key: '102',
    part_name: '后颈部',
    width: 67,
    height: 46,
    left: 517,
    top: 183
  },
  {
    part_key: '111',
    part_name: '左腹股沟',
    width: 48,
    height: 54,
    left: 133,
    top: 434
  },
  {
    part_key: '112',
    part_name: '右腹股沟',
    width: 48,
    height: 54,
    left: 218,
    top: 434
  },
  {
    part_key: '113',
    part_name: '左腋下',
    width: 25,
    height: 33,
    left: 250,
    top: 308
  },
  {
    part_key: '114',
    part_name: '右腋下',
    width: 25,
    height: 33,
    left: 124,
    top: 308
  },
  {
    part_key: '115',
    part_name: '女性外阴',
    width: 39,
    height: 43,
    left: 180,
    top: 458
  },
];

var head = [
  {
    part_key: '313',
    part_name: '眼睛',
    width: 358,
    height: 75,
    left: 126,
    top: 234
  },
  {
    part_key: '303',
    part_name: '额头',
    width: 524,
    height: 209,
    left: 43,
    top: 83
  },
  {
    part_key: '301',
    part_name: '头顶',
    width: 514,
    height: 155,
    left: 48,
    top: 6
  },
  {
    part_key: '307',
    part_name: '左面颊',
    width: 256,
    height: 294,
    left: 304,
    top: 279
  },
  {
    part_key: '308',
    part_name: '右面颊',
    width: 256,
    height: 296,
    left: 50,
    top: 279
  },
  {
    part_key: '304',
    part_name: '鼻子',
    width: 145,
    height: 209,
    left: 232,
    top: 256
  },
  {
    part_key: '311',
    part_name: '左眼周',
    width: 189,
    height: 124,
    left: 320,
    top: 209
  },
  {
    part_key: '312',
    part_name: '右眼周',
    width: 188,
    height: 124,
    left: 101,
    top: 209
  },
  {
    part_key: '305',
    part_name: '左耳',
    width: 71,
    height: 156,
    left: 533,
    top: 281
  },
  {
    part_key: '306',
    part_name: '右耳',
    width: 71,
    height: 156,
    left: 6,
    top: 281
  },
  {
    part_key: '309',
    part_name: '口周',
    width: 415,
    height: 217,
    left: 98,
    top: 502
  },
  {
    part_key: '310',
    part_name: '嘴唇',
    width: 218,
    height: 66,
    left: 196,
    top: 529
  },
];

var bodyResult = [];
for (let i=0; i<body.length; i++) {
  const item = body[i];
  let tmp = Object.assign(item, {left: item.left - bodyStart[0] + bodyMargin[0], top: item.top - bodyStart[1] + bodyMargin[1], text: item.part_name,active:false, animation: false})
  bodyResult.push(Object.assign(tmp, {left: handleOdd(tmp.left), top: handleOdd(tmp.top), width: handleOdd(tmp.width), height: handleOdd(tmp.height)}))
}
var headResult = [];
for (let i=0; i<head.length; i++) {
  const item = head[i];
  let tmp = Object.assign(item, {left:item.left - headStart[0] + headMargin[0], top: item.top - headStart[1] + headMargin[1], text: item.part_name,active:false, animation: false})
  headResult.push(Object.assign(tmp, {left: handleOdd(tmp.left), top: handleOdd(tmp.top), width: handleOdd(tmp.width), height: handleOdd(tmp.height)}))
}
// console.log('bodyResult', bodyResult);
// console.log('headResult', headResult);

function handleOdd(attr) {
  // 如果是奇数，则加1
  if (attr % 2 === 1) {
    return attr + 1
  }
  return attr;
}

const test = [
  {
    part_key: '103',
    part_name: '前肩部',
    width: 174,
    height: 40,
    left: 133,
    top: 152,
    text: '前肩部',
    active: false,
    animation: false
  },
  {
    part_key: '104',
    part_name: '后肩部',
    width: 174,
    height: 36,
    left: 485,
    top: 157,
    text: '后肩部',
    active: false,
    animation: false
  },
  {
    part_key: '105',
    part_name: '胸部左侧',
    width: 66,
    height: 134,
    left: 155,
    top: 187,
    text: '胸部左侧',
    active: false,
    animation: false
  },
  {
    part_key: '106',
    part_name: '胸部右侧',
    width: 66,
    height: 134,
    left: 221,
    top: 187,
    text: '胸部右侧',
    active: false,
    animation: false
  },
  {
    part_key: '107',
    part_name: '腹部',
    width: 132,
    height: 92,
    left: 155,
    top: 317,
    text: '腹部',
    active: false,
    animation: false
  },
  {
    part_key: '108',
    part_name: '背部',
    width: 132,
    height: 202,
    left: 507,
    top: 187,
    text: '背部',
    active: false,
    animation: false
  },
  {
    part_key: '109',
    part_name: '臀部左侧',
    width: 70,
    height: 76,
    left: 503,
    top: 369,
    text: '臀部左侧',
    active: false,
    animation: false
  },
  {
    part_key: '110',
    part_name: '臀部右侧',
    width: 70,
    height: 76,
    left: 571,
    top: 369,
    text: '臀部右侧',
    active: false,
    animation: false
  },
  {
    part_key: '116',
    part_name: '男性外阴',
    width: 40,
    height: 42,
    left: 201,
    top: 395,
    text: '男性外阴',
    active: false,
    animation: false
  },
  {
    part_key: '201',
    part_name: '前左上臂',
    width: 40,
    height: 112,
    left: 283,
    top: 183,
    text: '前左上臂',
    active: false,
    animation: false
  },
  {
    part_key: '202',
    part_name: '后左上臂',
    width: 40,
    height: 112,
    left: 471,
    top: 183,
    text: '后左上臂',
    active: false,
    animation: false
  },
  {
    part_key: '203',
    part_name: '前右上臂',
    width: 40,
    height: 114,
    left: 121,
    top: 183,
    text: '前右上臂',
    active: false,
    animation: false
  },
  {
    part_key: '204',
    part_name: '后右上臂',
    width: 40,
    height: 114,
    left: 633,
    top: 183,
    text: '后右上臂',
    active: false,
    animation: false
  },
  {
    part_key: '205',
    part_name: '前左前臂',
    width: 62,
    height: 104,
    left: 291,
    top: 285,
    text: '前左前臂',
    active: false,
    animation: false
  },
  {
    part_key: '206',
    part_name: '后左前臂',
    width: 62,
    height: 104,
    left: 441,
    top: 285,
    text: '后左前臂',
    active: false,
    animation: false
  },
  {
    part_key: '207',
    part_name: '前右前臂',
    width: 62,
    height: 104,
    left: 89,
    top: 285,
    text: '前右前臂',
    active: false,
    animation: false
  },
  {
    part_key: '208',
    part_name: '后右前臂',
    width: 62,
    height: 104,
    left: 643,
    top: 285,
    text: '后右前臂',
    active: false,
    animation: false
  },
  {
    part_key: '209',
    part_name: '前左大腿',
    width: 68,
    height: 186,
    left: 222,
    top: 374,
    text: '前左大腿',
    active: false,
    animation: false
  },
  {
    part_key: '210',
    part_name: '后左大腿',
    width: 64,
    height: 140,
    left: 505,
    top: 433,
    text: '后左大腿',
    active: false,
    animation: false
  },
  {
    part_key: '211',
    part_name: '前右大腿',
    width: 68,
    height: 186,
    left: 150,
    top: 374,
    text: '前右大腿',
    active: false,
    animation: false
  },
  {
    part_key: '212',
    part_name: '后右大腿',
    width: 66,
    height: 140,
    left: 575,
    top: 433,
    text: '后右大腿',
    active: false,
    animation: false
  },
  {
    part_key: '213',
    part_name: '前左小腿',
    width: 54,
    height: 148,
    left: 229,
    top: 552,
    text: '前左小腿',
    active: false,
    animation: false
  },
  {
    part_key: '214',
    part_name: '后左小腿',
    width: 48,
    height: 136,
    left: 513,
    top: 565,
    text: '后左小腿',
    active: false,
    animation: false
  },
  {
    part_key: '215',
    part_name: '前右小腿',
    width: 50,
    height: 148,
    left: 163,
    top: 553,
    text: '前右小腿',
    active: false,
    animation: false
  },
  {
    part_key: '216',
    part_name: '后右小腿',
    width: 46,
    height: 136,
    left: 585,
    top: 565,
    text: '后右小腿',
    active: false,
    animation: false
  },
  {
    part_key: '217',
    part_name: '左手掌',
    width: 60,
    height: 82,
    left: 329,
    top: 379,
    text: '左手掌',
    active: false,
    animation: false
  },
  {
    part_key: '218',
    part_name: '左手背',
    width: 60,
    height: 82,
    left: 405,
    top: 379,
    text: '左手背',
    active: false,
    animation: false
  },
  {
    part_key: '219',
    part_name: '右手掌',
    width: 60,
    height: 82,
    left: 53,
    top: 379,
    text: '右手掌',
    active: false,
    animation: false
  },
  {
    part_key: '220',
    part_name: '右手背',
    width: 60,
    height: 82,
    left: 681,
    top: 379,
    text: '右手背',
    active: false,
    animation: false
  },
  {
    part_key: '221',
    part_name: '左脚背',
    width: 64,
    height: 62,
    left: 231,
    top: 699,
    text: '左脚背',
    active: false,
    animation: false
  },
  {
    part_key: '222',
    part_name: '左脚底',
    width: 64,
    height: 62,
    left: 499,
    top: 699,
    text: '左脚底',
    active: false,
    animation: false
  },
  {
    part_key: '223',
    part_name: '右脚背',
    width: 64,
    height: 64,
    left: 147,
    top: 699,
    text: '右脚背',
    active: false,
    animation: false
  },
  {
    part_key: '224',
    part_name: '右脚底',
    width: 64,
    height: 64,
    left: 583,
    top: 699,
    text: '右脚底',
    active: false,
    animation: false
  },
  {
    part_key: '302',
    part_name: '后脑',
    width: 74,
    height: 78,
    left: 535,
    top: 49,
    text: '后脑',
    active: false,
    animation: false
  },
  {
    part_key: '101',
    part_name: '前颈部',
    width: 54,
    height: 46,
    left: 195,
    top: 127,
    text: '前颈部',
    active: false,
    animation: false
  },
  {
    part_key: '102',
    part_name: '后颈部',
    width: 68,
    height: 46,
    left: 539,
    top: 121,
    text: '后颈部',
    active: false,
    animation: false
  },
  {
    part_key: '111',
    part_name: '左腹股沟',
    width: 48,
    height: 56,
    left: 154,
    top: 371,
    text: '左腹股沟',
    active: false,
    animation: false
  },
  {
    part_key: '112',
    part_name: '右腹股沟',
    width: 50,
    height: 56,
    left: 239,
    top: 371,
    text: '右腹股沟',
    active: false,
    animation: false
  },
  {
    part_key: '113',
    part_name: '左腋下',
    width: 26,
    height: 34,
    left: 271,
    top: 245,
    text: '左腋下',
    active: false,
    animation: false
  },
  {
    part_key: '114',
    part_name: '右腋下',
    width: 26,
    height: 34,
    left: 145,
    top: 245,
    text: '右腋下',
    active: false,
    animation: false
  },
  {
    part_key: '115',
    part_name: '女性外阴',
    width: 40,
    height: 44,
    left: 201,
    top: 395,
    text: '女性外阴',
    active: false,
    animation: false
  }
]

console.log('test', test.map(item => ({...item, left: item.left - 20})))