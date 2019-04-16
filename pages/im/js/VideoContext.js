/**
 * 背景视频类
 */

function VideoContext() {
    this._playing = false;
    this.audio = wx.getBackgroundAudioManager();
    console.log('init Audio')
    this.audio.onCanplay(() => this._playing && this.audio.play());
}


VideoContext.prototype.setId = function (id) {
    this.id = id;
}

VideoContext.prototype.getId = function () {
    return this.id;
}


VideoContext.prototype.pause = function () {
    if (!this.id) {
        return false;
    }

    let video = wx.createVideoContext(this.id);
    video.pause();
}




module.exports = VideoContext