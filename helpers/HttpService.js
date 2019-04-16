import WxRequest from '../plugins/wx-request/lib/index'

class HttpService extends WxRequest {
	constructor(options) {
		super(options)
		this.$$prefix = ''
		this.$$path = {
			login: '?s=/api/user1/login',
			intoRoom: '?s=/api/classroom.index/into',
			roomMSG: '?s=/api/classroom.index/message',
			postMSG: '?s=/api/classroom.index/submit',
			undoMSG: '?s=/api/classroom.index/remove',
			uploadToken: '?s=/api/upload/token',
			indexHome: '?s=api/miniprogram.index/home',
			articleList: '?s=api/miniprogram.index/articleList',
			helpList: '?s=api/miniprogram.index/helpList',
			queryUserInfo: '?s=api/miniprogram.user/showInfo',
			postUserInfo: '?s=api/miniprogram.user/editInfo',
			getPhone: '?s=api/miniprogram.user/encrypt',
			getBasicInfo: '?s=/api/miniprogram.treat_v2/getSelectItemOne',
			setBasicInfo: '?s=/api/miniprogram.treat_v2/addPlanOne',
			getBasicCase: '?s=/api/miniprogram.treat_v2/getSelectItemTwo',
			setBasicCase: '?s=/api/miniprogram.treat_v2/addPlanTwo',
			// getBasicCase: '?s=api/miniprogram.treat/getSelectItem',
			// setBasicCase: '?s=api/miniprogram.treat/addPlan',
			getTreatPlan: '?s=api/miniprogram.treat/getRecord',
			getPlanDetail: '?s=api/miniprogram.treat/getPlan',
			setPlanDetail: '?s=api/miniprogram.treat/editDetail',
			setReturnDay: '?s=api/miniprogram.treat/setReturn',
			unsetReturnDay: '?s=api/miniprogram.treat/unsetReturn',
			getPartImg: '?s=api/miniprogram.treat/getPartImg',
			getCycleHistory: '?s=api/miniprogram.treat/getPlanByCycle',
			getClassroomInfo: '?s=api/miniprogram.classroom/getClassroomInfo',
			closedRoom: '?s=/api/classroom.index/end',
			signUpRoom: '?s=api/miniprogram.classroom/enter',
			getClassroomList: '?s=api/miniprogram.classroom/getClassroomList',
			getInvite: '?s=api/miniprogram.classroom/getInvite',
			getInviteCode: '?s=api/miniprogram.classroom/getInviteCode',
			toBeguess: '?s=api/miniprogram.classroom/toBeguess',
			setModel: '?s=api/miniprogram.treat/changeDataType',
			getControl: '?s=api/miniprogram.treat/getControl',
		}
		this.interceptors.use({
			request(request) {
				request.header = request.header || {}
				request.header['content-type'] = 'application/json'
				// request.header['content-type'] = 'application/x-www-form-urlencoded'
				const token = wx.getStorageSync('token');
				const wxapp_id = 10001;
				const noToken = request.data.noToken;
				if (token.length == 0 && !noToken) {
					wx.navigateTo({
						url: '/pages/login/index',
						fail: (e) => {
							console.log(e);
						},
						success: (e) => {
							console.log(e);
						}
					})
					return false;
				}
				request.data = Object.assign({
					token,
					wxapp_id,
				}, request.data)

				wx.showLoading({
					title: '加载中',
				})
				return request;
			},
			requestError(requestError) {
				wx.hideLoading()
				return Promise.reject(requestError)
			},
			response(response) {
				console.log(response);
				wx.hideLoading()
				if (response.data.code === 401) {
					wx.removeStorageSync('token')
					wx.redirectTo({
						url: '/pages/login/index'
					})
				}
				if (response.data.code != 1) {
					const msg = response.data.msg;
					if (msg) {
						wx.showToast({
							title: msg,
							icon: 'none',
							duration: 1000
						})
					}
					return Promise.reject(response)
				} else {
					return response.data
				}
			},
			responseError(responseError) {
				wx.hideLoading()
				return Promise.reject(responseError)
			},
		})
	}
	login(params) {
		return this.postRequest(this.$$path.login, {
			data: params,
		})
	}
	signUpRoom(params) {
		return this.postRequest(this.$$path.signUpRoom, {
			data: params,
		})
	}
	indexHome(params) {
		return this.getRequest(this.$$path.indexHome, {
			data: params,
		})
	}
	closedRoom(params) {
		return this.getRequest(this.$$path.closedRoom, {
			data: params,
		})
	}
	getClassroomList(params) {
		return this.getRequest(this.$$path.getClassroomList, {
			data: params,
		})
	}
	getInvite(params) {
		return this.getRequest(this.$$path.getInvite, {
			data: params,
		})
	}
	getInviteCode(params) {
		return this.getRequest(this.$$path.getInviteCode, {
			data: params,
		})
	}
	toBeguess(params) {
		return this.getRequest(this.$$path.toBeguess, {
			data: params,
		})
	}
	articleList(params) {
		return this.getRequest(this.$$path.articleList, {
			data: params,
		})
	}
	getClassroomInfo(params) {
		return this.getRequest(this.$$path.getClassroomInfo, {
			data: params,
		})
	}
	queryUserInfo(params) {
		return this.getRequest(this.$$path.queryUserInfo, {
			data: params,
		})
	}
	helpList(params) {
		return this.getRequest(this.$$path.helpList, {
			data: params,
		})
	}
	intoRoom(params) {
		return this.getRequest(this.$$path.intoRoom, {
			data: params,
		})
	}
	roomMSG(params) {
		return this.getRequest(this.$$path.roomMSG, {
			data: params,
		})
	}
	uploadToken(params) {
		return this.getRequest(this.$$path.uploadToken, {
			data: params,
		})
	}
	postMSG(params) {
		return this.postRequest(this.$$path.postMSG, {
			data: params,
		})
	}
	postUserInfo(params) {
		return this.postRequest(this.$$path.postUserInfo, {
			data: params,
		})
	}
	undoMSG(params) {
		return this.postRequest(this.$$path.undoMSG, {
			data: params,
		})
	}
	getPhone(params) {
		return this.postRequest(this.$$path.getPhone, {
			data: params,
		})
	}
	getBasicInfo(params) {
		return this.getRequest(this.$$path.getBasicInfo, {
			data: params,
		})
	}
	setBasicInfo(params) {
		return this.postRequest(this.$$path.setBasicInfo, {
			data: params,
		})
	}
	getBasicCase(params) {
		return this.getRequest(this.$$path.getBasicCase, {
			data: params,
		})
	}
	setBasicCase(params) {
		return this.postRequest(this.$$path.setBasicCase, {
			data: params,
		})
	}
	getTreatPlan(params) {
		return this.getRequest(this.$$path.getTreatPlan, {
			data: params,
		})
	}
	getPlanDetail(params) {
		return this.getRequest(this.$$path.getPlanDetail, {
			data: params,
		})
	}
	setPlanDetail(params) {
		return this.postRequest(this.$$path.setPlanDetail, {
			data: params,
		})
	}
	setReturnDay(params) {
		return this.postRequest(this.$$path.setReturnDay, {
			data: params,
		})
	}
	unsetReturnDay(params) {
		return this.postRequest(this.$$path.unsetReturnDay, {
			data: params,
		})
	}
	getPartImg(params) {
		return this.getRequest(this.$$path.getPartImg, {
			data: params,
		})
	}
	getCycleHistory(params) {
		return this.getRequest(this.$$path.getCycleHistory, {
			data: params,
		})
	}
	setModel(params) {
		return this.postRequest(this.$$path.setModel, {
			data: params,
		})
	}
	getControl(params) {
		return this.getRequest(this.$$path.getControl, {
			data: params,
		})
	}
}

export default HttpService