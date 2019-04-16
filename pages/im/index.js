import regeneratorRuntime, {
    async
} from '../../plugins/regenerator-runtime/runtime';
import qiniuUploader from '../../plugins/qiniuUploader';
// import AudioContext from './js/AudioContext';
import AudioContext from './js/BGMContext';
import VideoContext from './js/VideoContext';
import IM from './js/IM';
//index.js
//获取应用实例
let webim = require('../../plugins/webim/webim_wx.js');
let webimhandler = require('../../plugins/webim/webim_handler.js');

global.webim = webim;

let audioContext = new AudioContext();
let videoContext = new VideoContext();
let im = new IM();

// 全局唯一的录音管理器
let app = getApp()
Page({
    /**  生命周期  **/
    data: {
        inBG: false, //是否处于后台状态
        durationTime: 500,
        autoPlay: true,
        height: 0,
        scrollTop: 0,
        lowerThreshold: 0,
        userInfo: '',
        userid: '',
        swiperIndex: 0,
        msgs: [],
        room_ppt: [],
        msgContent: "",
        inputType: '', // 显示输入类型， text	image	voice
        recordStatus: '', // 录音状态 running	done	''
        timerObj: null, // 计时器
        timer: 1, // 读秒
    },
    onLoad: async function () {
        const res = wx.getSystemInfoSync()
        const isIphX = app.globalData.isIphX;
        console.log(res.windowHeight);
        const contentHeight = isIphX ? (res.windowHeight - 300) + 'px' : (res.windowHeight - 200) + 'px'

        console.log(res.windowHeight);
        console.log(contentHeight);
        this.setData({
            userid: wx.getStorageSync('userid'),
            userInfo: wx.getStorageSync('userInfo'),
            room_id: app.globalData.room_id,
            height: contentHeight,
            isIphX,
        })

        console.log(this.data.isIphX);

        /** 初始化音频播放 */
        this.initRecord();

        /** 初始化历史消息 */
        await this.historyMSG();

        /** 初始化直播 */
        let {
            user,
            room_info,
        } = await this.login();
        im.init({
            user,
            room_info,
            receiveMsgs: this.receiveMsgs
        });

        /** 普通用户 自动播放 */
        if (user.role != 'manager' && user.role != 'presenter') {
            this.autoPlay();
        } else {
            this.setData({
                autoPlay: false
            })
        }

        /** 管理员 获取邀请嘉宾验证码 */
        if (user.role == 'manager') {
            const inviteInfo = await app.HttpService.getInviteCode({
                room_id: app.globalData.room_id
            }).then(res => res.data);
            this.setData({
                inviteInfo
            })
        }
    },
    onShareAppMessage: function (res) {
        const inviteInfo = this.data.inviteInfo;
        const config = {
            imageUrl: inviteInfo.invite_img,
            title: inviteInfo.invite_title,
            path: '/pages/im/start?id=' + app.globalData.room_id + '&code=' + inviteInfo.invite_code
        };
        return config;
    },
    onHide: function (res) {
        // wx.navigateBack({
        //     delta: 1
        // })
    },
    onUnload: function () {
        /**退出轮询 */
        webim.logout();
        webimhandler.quitBigGroup();
        /** 停止在播放的音频 */
        // audioContext.stop();

        /**记录最近播放的音频 */
        wx.setStorageSync('lastRecord_' + this.data.room_info.id, this.data.lastPlayId);
        this.setData({
            inBG: true
        })
    },
    /**  初始化 **/
    initRecord: function () {
        let RecorderManager = wx.getRecorderManager()
        RecorderManager.onStop(tempFile => this.setData({
            tempFile,
        }));
        this.setData({
            RecorderManager
        })
    },
    /**  事件处理函数 **/
    gotoTop: function () {
        this.setData({
            scrollTop: 0,
        })
    },
    gotoBottom: async function () {
        let id_list = this.data.msgs.filter(it => it.msg_id).map(it => '_' + it.msg_id);
        let scrollTop = await this.queryEleTopbyId(id_list);
        this.setData({
            scrollTop: scrollTop + 999,
        })
    },
    swiperChangeHandle: function (e) {
        let swiperIndex = e.detail.current;
        this.setData({
            swiperIndex,
        })
    },
    ImageHandle: function (e) {
        let src = e.currentTarget.dataset.src;
        let ulrs = this.data.msgs.filter(item => item.msg_type == 'image').map(item => item.content);
        wx.previewImage({
            current: src,
            urls: ulrs,
        })
    },
    autoPlay: async function () {
        let lastPlayId = wx.getStorageSync('lastRecord_' + this.data.room_info.id);
        let msgs = this.data.msgs;
        let startAudio, currentIndex;
        if (lastPlayId) {
            startAudio = msgs.find(item => item.msg_id == lastPlayId);
            currentIndex = msgs.findIndex(item => item.msg_id == lastPlayId);
        } else {
            startAudio = msgs.find(item => item.msg_type == 'voice');
            currentIndex = msgs.findIndex(item => item.msg_type == 'voice');
        }
        console.log('autoplay,', lastPlayId);
        this.playRecord({
            currentTarget: {
                dataset: {
                    pptid: startAudio.ppt_id,
                    msgid: startAudio.msg_id,
                    content: startAudio.content
                }
            }
        })
        let id_list = msgs.filter((it, index) => index < currentIndex && it.msg_id).map(it => '_' + it.msg_id);
        let scrollTop = await this.queryEleTopbyId(id_list);
        this.setData({
            scrollTop,
        })
    },
    playVideo: function (e) {
        console.log('playVideo');
        let id = e.currentTarget.id;
        videoContext.setId(id);
        audioContext.pause();
        let msgs = this.data.msgs.map(item => {
            item.playing = false;
            return item;
        });
        this.setData({
            msgs,
        })
    },
    playRecord: async function (e) {
        // 如果正在滚动，则不能播放下一条，避免轮播闪屏
        if (this.data.durationSwiper) {
            return false;
        }
        let {
            content,
            msgid,
            pptid
        } = e.currentTarget.dataset;
        let msgs = this.data.msgs;
        let durationTime = this.data.durationTime;
        let current_msg = msgs.find(item => item.msg_id == msgid);
        let swiperIndex = this.data.room_ppt.findIndex(item => item.id == pptid);
        let title = this.data.room_info.name;
        swiperIndex < 0 && swiperIndex == 0;
        if (current_msg.playing) {
            audioContext.pause()
        } else {
            audioContext.play({
                src: content,
                title,
                onEnded: () => {
                    console.log('播放完结' + msgid);
                    this.setData({
                        msgs: this.data.msgs.map(item => item.msg_id == msgid ? (item.playing = audioContext.getPlaying(), item) : (item.playing = false, item)),
                    })
                    if (this.data.autoPlay) {
                        let currentIndex = this.data.msgs.findIndex(item => item.msg_id == msgid);
                        let nextAudio = this.data.msgs.find((item, index) => index > currentIndex && item.msg_type == 'voice');
                        nextAudio && this.playRecord({
                            currentTarget: {
                                dataset: {
                                    pptid: nextAudio.ppt_id,
                                    msgid: nextAudio.msg_id,
                                    content: nextAudio.content
                                }
                            }
                        })
                    }
                }
            })
            videoContext.pause();
        }

        // 如果是在后台 则及时更新最近播放记录
        if (this.data.inBG) {
            wx.setStorageSync('lastRecord_' + this.data.room_info.id, msgid);
        }

        this.setData({
            durationSwiper: true,
            lastPlayId: msgid,
            swiperIndex,
            msgs: msgs.map(item => item.msg_id == msgid ? (item.playing = audioContext.getPlaying(), item) : (item.playing = false, item))
        })

        // 控制切换播放的频繁，必须让swiper 滚完才可以进行下一次切换，防止闪屏
        setTimeout(() => {
            this.setData({
                durationSwiper: false
            })
        }, durationTime)
    },
    queryEleTopbyId: function (id_list) {
        return new Promise((resolve, reject) => {
            let query = wx.createSelectorQuery()
            id_list.map(id => query.select('#' + id).boundingClientRect());
            query.exec(function (res) {
                let sum = res.reduce((sum, it) => sum += (it.height + 20), 50)
                resolve(sum);
            })
        }).catch((e) => {
            console.error(e);
        })
    },
    undoHandle: function (e) {
        let msg_id = e.currentTarget.dataset.msgid;
        let id = e.currentTarget.dataset.id;
        let userInfo = this.data.userInfo;
        let userid = this.data.userid;

        let custom = {
            id,
            msg_id,
            user_id: userid,
            classroom_id: this.data.room_id,
            role_name: this.data.user.role_name,
            msg_type: 'text',
            header_img: userInfo.avatarUrl,
            actionType: 1, // 操作类型，0 为新增消息，1为撤回消息
        }

        webimhandler.onSendMsg('撤回消息', custom);
    },
    changeInputType: async function (e) {
        let inputType = e.currentTarget.dataset.type;
        this.setData({
            inputType,
        })
        if (inputType == 'image') {
            this.sendImageHanlde(e);
        }
    },
    cancelRecord: function (e) {
        this.changeInputType(e);
        this.changeRecordStatus(e);
    },
    changeRecordStatus: async function (e) {
        let recordStatus = e.currentTarget.dataset.status;
        let timerObj = this.data.timerObj;
        let obj = {};
        clearInterval(timerObj);
        obj.recordStatus = recordStatus;
        switch (recordStatus) {
            case '':
                // 初始状态
                obj.timer = 1, obj.tempFile = '';
                this.data.RecorderManager.stop();
                break;
            case 'running':
                // 开始录音
                this.data.RecorderManager.start();
                timerObj = setInterval(() => {
                    let timer = this.data.timer;
                    if (timer * 1 >= 60) {
                        clearInterval(timerObj);
                        this.changeRecordStatus({
                            currentTarget: {
                                dataset: {
                                    status: 'done'
                                }
                            }
                        })
                    } else {
                        timer++;
                        this.setData({
                            timer
                        })
                    }
                }, 1000)
                obj.timerObj = timerObj;
                break;
            case 'done':
                // 完成录音
                this.data.RecorderManager.stop();
                break;
            case 'send':
                // 发送
                obj.timer = 1, obj.tempFile = '', obj.inputType = '';
                this.sendRecordHanlde();
                break;
        }
        this.setData({
            ...obj
        })

    },
    sendImageHanlde: async function (e) {
        let filePath = await app.WxService.chooseImage({
            count: 1,
        }).then(res => res.tempFilePaths[0]);
        this.qiniuUploadFile(filePath, (res) => {
            this.sendMsg(res.imageURL, 'image', () => {

            })
        });
    },
    sendRecordHanlde: async function (e) {
        let tempFile = this.data.tempFile;
        let tempFilePath = tempFile.tempFilePath;
        this.qiniuUploadFile(tempFilePath, (res) => {
            this.sendMsg(res.imageURL, 'voice', () => {

            }, {
                last: Math.ceil(tempFile.duration / 1000)
            })
        });
    },
    sendTextHanlde: function (e) {
        let content = this.data.msgContent;
        let msg_type = 'text';
        this.sendMsg(content, msg_type, () => {
            this.clearInput();
        })
    },
    bindKeyInput: function (e) {
        this.setData({
            msgContent: e.detail.value
        })
    },
    /**  公用 **/
    sendMsg: async function (content, msg_type, cb, otherObj) {
        let {
            userInfo,
            userid,
            swiperIndex,
            room_ppt,
            msgs
        } = this.data;
        let ppt_id = room_ppt[swiperIndex] && room_ppt[swiperIndex]['id'];
        let custom = {
            ...otherObj,
            ppt_id,
            msg_type,
            user_id: userid,
            classroom_id: this.data.room_id,
            role_name: this.data.user.role_name,
            header_img: userInfo.avatarUrl,
            actionType: 0, // 操作类型，0 为新增消息，1为撤回消息
        }
        if (!content.replace(/^\s*|\s*$/g, '')) return;
        webimhandler.onSendMsg(content, custom, async () => {
            cb && cb();
        })
    },
    qiniuUploadFile: async function (filePath, cb) {
        const {
            domain,
            token
        } = await app.HttpService.uploadToken({}).then(res => res.data);
        qiniuUploader.upload(filePath, (res) => {
            cb && cb(res);
        }, (error) => {
            console.log('error: ' + error);
        }, {
            region: 'ECN',
            domain: domain, // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
            uptoken: token, // 由其他程序生成七牛 uptoken
        }, (res) => {
            console.log('上传进度', res.progress)
            console.log('已经上传的数据长度', res.totalBytesSent)
            console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        });
    },
    clearInput: function () {
        this.setData({
            msgContent: ""
        })
    },
    /**  直播 **/
    login: async function () {
        let res = await app.HttpService.intoRoom({
            room_id: this.data.room_id,
            token: wx.getStorageSync('token')
        }).then(res => res.data);
        let {
            is_manager,
            is_presenter
        } = res.user;
        let role, role_name;
        if (is_manager == 1) {
            role = 'manager', role_name = '管理员';
        } else if (is_presenter == 1) {
            role = 'presenter', role_name = '嘉宾';
        } else {
            role = 'person', role_name = '普通用户';
        }
        res.user = Object.assign(res.user, {
            role,
            role_name,
            identifier: 'dg_1',
            account_mode: 0 //帐号模式，0-表示独立模式，1-表示托管模式
        });

        this.setData({
            ...res
        });
        return res;
    },
    closedRoom: async function () {
        let res = await app.HttpService.closedRoom({
            room_id: this.data.room_id,
        }).then(res => res.data);
        if (res) {
            wx.showToast({
                title: res.data,
                icon: 'success',
                duration: 2000
            })
        }
    },
    historyMSG: async function () {
        let records = await app.HttpService.roomMSG({
            room_id: this.data.room_id,
            token: wx.getStorageSync('token')
        }).then(res => res.data && res.data.records);
        this.setData({
            msgs: records
        });
    },

    /** IM 接受消息的事件绑定，业务的核心逻辑 */
    receiveMsgs: async function (data) {
        console.log(data, 'receiveMsgs');
        let content = data.content;
        let el = data.customs[0];
        let msgs = this.data.msgs || [];
        let self = this;
        if (el) {
            let custom = el && JSON.parse(el.getContent().data);
            let actionType = custom.actionType;
            let {
                msg_id,
            } = custom;

            if (actionType == 1) {
                // 撤回操作
                msgs = msgs.filter(msg => msg.msg_id != msg_id);
                app.HttpService.undoMSG({
                    msg_id,
                    classroom_id: this.data.room_id
                })
                setMsgs(this);
            } else if (custom.type == 'unallowed') {
                if (self.data.user.role == 'person' && (custom.content == 'all' || custom.content == self.data.user.user_id)) {
                    let user = self.data.user;
                    let room_info = self.data.room_info;
                    user.is_speak = 0;
                    room_info.forbidden_status = 1;
                    self.setData({
                        user,
                        room_info
                    });
                }
            } else if (custom.type == 'allowed') {
                if (custom.content == 'all' || custom.content == self.data.user.user_id) {
                    let user = self.data.user;
                    let room_info = self.data.room_info;

                    user.is_speak = 1;
                    room_info.forbidden_status = 0;
                    self.setData({
                        user,
                        room_info
                    });
                }
            } else {
                // 发送操作
                let nick_name = data.fromAccountNick;
                let current_msg = {
                    ...custom,
                    content,
                    nick_name,
                    msg_id: data.time,
                }
                msgs.push(current_msg);
                if (custom.user_id == wx.getStorageSync('userid')) {
                    app.HttpService.postMSG({
                        ...current_msg
                    }).then(() => {
                        setMsgs(self);
                        scrollBottom(self);
                    })
                } else {
                    setMsgs(self);
                    scrollBottom(self);
                }
            }
        } else {
            // 系统消息
            data.nick_name = data.fromAccountNick;
            msgs.push(data);
            setMsgs(this);
            scrollBottom(this);
        }


        function setMsgs(self) {
            //最多展示1000条信息
            if (msgs.length > 1000) {
                msgs.splice(0, msgs.length - 1000)
            }
            self.setData({
                msgs: msgs,
            })
        }

        async function scrollBottom(self) {
            /** 如果没有在播放音频，滚动到最后发消息处 */
            let playing = msgs.filter(it => it.playing).length > 0
            if (!playing) {
                let id_list = msgs.filter(it => it.msg_id).map(it => '_' + it.msg_id);
                let scrollTop = await self.queryEleTopbyId(id_list);
                self.setData({
                    scrollTop: scrollTop + 999,
                })
            }
        }
    },
    // 点赞
    // bindTap: function () {
    //     webimhandler.sendGroupLoveMsg();
    // },
})