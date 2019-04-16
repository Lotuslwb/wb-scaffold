const all_body = [
  {
    part_key: '103',
    part_name: '前肩部',
    width: 174,
    height: 40,
    left: 113,
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
    left: 465,
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
    left: 135,
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
    left: 201,
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
    left: 135,
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
    left: 487,
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
    left: 483,
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
    left: 551,
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
    left: 181,
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
    left: 263,
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
    left: 451,
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
    left: 101,
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
    left: 613,
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
    left: 271,
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
    left: 421,
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
    left: 69,
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
    left: 623,
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
    left: 202,
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
    left: 485,
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
    left: 130,
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
    left: 555,
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
    left: 209,
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
    left: 493,
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
    left: 143,
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
    left: 565,
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
    left: 309,
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
    left: 385,
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
    left: 33,
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
    left: 661,
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
    left: 211,
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
    left: 479,
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
    left: 127,
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
    left: 563,
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
    left: 515,
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
    left: 175,
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
    left: 519,
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
    left: 134,
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
    left: 219,
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
    left: 251,
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
    left: 125,
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
    left: 181,
    top: 395,
    text: '女性外阴',
    active: false,
    animation: false
  }
];

const all_head = [
  {
    part_key: '313',
    part_name: '眼睛',
    width: 358,
    height: 76,
    left: 194,
    top: 278,
    text: '眼睛',
    active: false,
    animation: false
  },
  {
    part_key: '303',
    part_name: '额头',
    width: 524,
    height: 210,
    left: 110,
    top: 128,
    text: '额头',
    active: false,
    animation: false
  },
  {
    part_key: '301',
    part_name: '头顶',
    width: 514,
    height: 156,
    left: 116,
    top: 50,
    text: '头顶',
    active: false,
    animation: false
  },
  {
    part_key: '307',
    part_name: '左面颊',
    width: 256,
    height: 294,
    left: 372,
    top: 324,
    text: '左面颊',
    active: false,
    animation: false
  },
  {
    part_key: '308',
    part_name: '右面颊',
    width: 256,
    height: 296,
    left: 118,
    top: 324,
    text: '右面颊',
    active: false,
    animation: false
  },
  {
    part_key: '304',
    part_name: '鼻子',
    width: 146,
    height: 210,
    left: 300,
    top: 300,
    text: '鼻子',
    active: false,
    animation: false
  },
  {
    part_key: '311',
    part_name: '左眼周',
    width: 190,
    height: 124,
    left: 388,
    top: 254,
    text: '左眼周',
    active: false,
    animation: false
  },
  {
    part_key: '312',
    part_name: '右眼周',
    width: 188,
    height: 124,
    left: 168,
    top: 254,
    text: '右眼周',
    active: false,
    animation: false
  },
  {
    part_key: '305',
    part_name: '左耳',
    width: 72,
    height: 156,
    left: 600,
    top: 326,
    text: '左耳',
    active: false,
    animation: false
  },
  {
    part_key: '306',
    part_name: '右耳',
    width: 72,
    height: 156,
    left: 74,
    top: 326,
    text: '右耳',
    active: false,
    animation: false
  },
  {
    part_key: '309',
    part_name: '口周',
    width: 416,
    height: 218,
    left: 166,
    top: 546,
    text: '口周',
    active: false,
    animation: false
  },
  {
    part_key: '310',
    part_name: '嘴唇',
    width: 218,
    height: 66,
    left: 264,
    top: 574,
    text: '嘴唇',
    active: false,
    animation: false
  }
];

const all_part = [
  {
    part_key: '000',
    part_name: '全身部位',
    text: '全身部位',
    active: false,
    animation: false
  }
];

module.exports = {
  all_body,
  all_head,
  all_part
};
