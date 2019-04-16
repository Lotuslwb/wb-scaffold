/**
 * 播放音频类
 */
import util from '../../../plugins/util';

function AudioContext() {
    this._playing = false;
    this.audio = wx.createInnerAudioContext();
    this.audio.onCanplay(() => this._playing && this.audio.play());
}

/**
 * destroy  销毁当前实例
 */
AudioContext.prototype.destroy = function () {
    this.audio.destroy();
}

/**
 * 停止播放
 */
AudioContext.prototype.stop = function () {
    this.audio.stop();
    this._playing = false;
}

/** 
 * 暂停播放
 * */ 
AudioContext.prototype.pause = function () {
    this.audio.pause();
    this._playing = false;
}

/**
 * 播放
 * @param {Object} option 
 * @param {String.isRequire} option.src  音频播放路径
 * @param {Function} option.onEnd  音频播放结束后回调
 */
AudioContext.prototype.play = function ({
    src = util.isRequire('src'),
    onEnded = () => {}
}) {
    this.audio.src = src;
    this._playing = true;
    this.audio.play()
    this.audio.onEnded(() => {
        this._playing = false;
        this.audio.offEnded();
        onEnded();
    });
}
/**
 * 播放状态切换，在播放和停止之间切换
 * @param {Object} option 
 * @param {String.isRequire} option.src  音频播放路径
 * @param {Function} option.onEnd  音频播放结束后回调
 */
AudioContext.prototype.toggle = function (option) {
    this._playing ? this.stop() : this.play(option);
}

/**
 * 获取播放状态
 */
AudioContext.prototype.getPlaying = function () {
    return this._playing;
}

module.exports = AudioContext