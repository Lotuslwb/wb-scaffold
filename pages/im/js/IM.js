/**
 * 直播IM类
 */
import util from '../../../plugins/util';
import webim from '../../../plugins/webim/webim_wx';
import webimhandler from '../../../plugins/webim/webim_handler';

global.webim = webim;

function IM() {

}

/**
 * 初始化IM
 * @param {Object} option 
 * @param {Object.isRequire} option.user  用户信息
 * @param {Object.isRequire} option.room_info  直播间信息
 * @param {Function.isRequire} option.receiveMsgs  发送消息的事件绑定 *业务的核心逻辑*
 */
IM.prototype.init = function ({
    user = util.isRequire('src'),
    room_info = util.isRequire('room_info'),
    receiveMsgs = () => {},
}) {
    let that = this;
    let avChatRoomId = room_info.group_id;
    webimhandler.init({
        accountMode: user.account_mode,
        accountType: user.account_type,
        sdkAppID: user.app_id,
        avChatRoomId: avChatRoomId, //默认房间群ID，群类型必须是直播聊天室（AVChatRoom），这个为官方测试ID(托管模式)
        selType: webim.SESSION_TYPE.GROUP,
        selToID: avChatRoomId,
        selSess: null //当前聊天会话
    });
    //当前用户身份
    let loginInfo = {
        'sdkAppID': user.app_id, //用户所属应用id,必填
        'appIDAt3rd': user.app_id, //用户所属应用id，必填
        'accountType': user.account_type, //用户所属应用帐号类型，必填
        'identifier': wx.getStorageSync('userid'), //当前用户ID,必须是否字符串类型，选填
        'identifierNick': user.nick_name, //当前用户昵称，选填
        'userSig': user.sig, //当前用户身份凭证，必须是字符串类型，选填
    };

    //监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
    let onGroupSystemNotifys = {
        "5": webimhandler.onDestoryGroupNotify, //群被解散(全员接收)
        "11": webimhandler.onRevokeGroupNotify, //群已被回收(全员接收)
        "255": webimhandler.onCustomGroupNotify //用户自定义通知(默认全员接收)
    };

    //监听连接状态回调变化事件
    let onConnNotify = function (resp) {
        switch (resp.ErrorCode) {
            case webim.CONNECTION_STATUS.ON:
                //webim.Log.warn('连接状态正常...');
                break;
            case webim.CONNECTION_STATUS.OFF:
                webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
                break;
            default:
                webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
                break;
        }
    };


    //监听事件
    let listeners = {
        "onConnNotify": webimhandler.onConnNotify, //选填
        "onBigGroupMsgNotify": function (msg) {
            webimhandler.onBigGroupMsgNotify(msg, function (msgs) {
                receiveMsgs(msgs);
            })
        }, //监听新消息(大群)事件，必填
        "onMsgNotify": webimhandler.onMsgNotify, //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
        "onGroupSystemNotifys": webimhandler.onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
        "onGroupInfoChangeNotify": webimhandler.onGroupInfoChangeNotify //监听群资料变化事件，选填
    };

    //其他对象，选填
    let options = {
        'isAccessFormalEnv': true, //是否访问正式环境，默认访问正式，选填
        'isLogOn': true //是否开启控制台打印日志,默认开启，选填
    };

    if (user.account_mode == 1) { //托管模式
        webimhandler.sdkLogin(loginInfo, listeners, options, avChatRoomId);
    } else { //独立模式
        //sdk登录
        webimhandler.sdkLogin(loginInfo, listeners, options, avChatRoomId);
    }
}



module.exports = IM;