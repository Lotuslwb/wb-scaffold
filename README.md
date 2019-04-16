#自用简易脚手架

## 常用方法

 ` 使用app.WxService 调用原生方法支持promise

    app.WxService.navigateTo("/pages/apply/index?type=bus&roleType=1");


    app.WxService.scanCode({
          onlyFromCamera: false,
        }).then(res => {
          return app.HttpService.getCabinetcodeByid({
            cabinet_id,
          })
        }).then(data => {
            const cabinet_code = data.data.cabinet_code;
            app.globalData.cabinet_code = cabinet_code;
            this.aferScanCode(cabinet_code);
        }).catch((e) => {
          console.log(e);
          app.WxService.redirectTo("/pages/operator/usercenter/index");
    })

` 使用 app.HttpService 发送请求 进行了一些封装

    app.HttpService.getorderlist(params).then(data => {
      console.log(data);
      var result = data.data.map((item) => {
        item['addtime_format'] = moment(item['addtime'] * 1000).format('YYYY-MM-DD HH:mm:ss');
        item['order_no_format'] = '...' + item['order_no'].slice(item['order_no'].length - 12, item['order_no'].length);
        item['goods_list'].map((it) => {
          it.price = it.good_price;
          return it;
        })
        return item;
    })

` 支持 async-await

```
  import regeneratorRuntime from '../../plugins/regenerator-runtime/runtime';

    getScan: async () => {
    let qcode = await app.WxService.scanCode({
      onlyFromCamera: false,
    }).then(res => {
      return res.result;
    });
    console.log(qcode);
  },
```

## 目录结构
```
  ├── README.md
  ├── app.js
  ├── app.json
  ├── app.wxss
  ├── etc             //用于放置各种配置类文件
  │   └── config.js   //配置文件，目前用于请求URL的配置
  ├── helpers
  │   ├── HttpResource.js
  │   └── HttpService.js  // 在这里写请求
  ├── img
  ├── js    // js库，自动lodash 和 momnet
  │   ├── lodash.core.js
  │   └── moment.min.js
  ├── pages   //小程序页面
  ├── plugins  // 自带模块，实现一些封装
  └── style  // ui库 自带weui
      └── weui.wxss
```

## hjt todo
```
1. 光疗课堂和“我的光疗课堂” --》 列表页。没有接口和ui，等产品
2. 复诊（detail_3）接口报错
3. 基础案例未填的case要清空数据才能测试到
4. 复诊周的字段没有
```

## hjt done
```
1. 首页样式调整，已有功能的跳转
2. 基础案例页面及联调
3. 日历样式
4. 观察、复诊、治疗的样式
5. 授权页 --》 “哈哈”说：跳转到个人信息页，强制用户填
6. 知识列表及详情
7. 个人信息
8. 光疗日历 -》 如果没有基础病历，则先完善。
9. 首页今天计划那边的图标会变，复诊，观察，治疗是动态的。
10. 首页往期精彩 --》 暂时没有，原来的链接应该加到知识列表去跳转h5页面
11. 取消设置复诊日的弹窗提示，已测试
12. picker给一些字段加默认值，初始化的时候先进行数据处理， 已测试
13. detail_4历史页
14. 前端校验必填项（观察和治疗，已测试）
```

## hjt need help
```
1. 如何修改switch的原生样式
```
