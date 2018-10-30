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