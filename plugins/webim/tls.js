var encrypt = require('encrypt.js');

var sdkappid = 10001;


function login(opts) {
    wx.request({
        url: 'http://sigemas.shsmiles.com/index.php?s=/api/wxapp/signature&wxapp_id=10001', //仅为示例，并非真实的接口地址
        data: {
            identifier: opts.identifier
        },
        method: 'get',
        header: {
            'content-type': 'application/json'
        },
        success: function (res) {
            let data = res.data.data;
            opts.success && opts.success({
                ...data,
                UserSig: data.sig
            });
        },
        fail: function (errMsg) {
            opts.error && opts.error(errMsg);
        }
    });
}

module.exports = {
    init: function (opts) {
        sdkappid = opts.sdkappid;
    },
    login: login
};