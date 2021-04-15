(function() {
    //提供当前帧数
    window.FrameUtil = Class.extend({
        init: function() {
            //当前帧序号
            this.currentFrame = 0;
            this.sFrame = 0;
            this.sTime = new Date();
            this.realFps = 0;
        },
        //在mainloop中每帧执行
        update: function() {

            this.currentFrame++;
            var t = new Date();
            if (t - this.sTime >= 1000) {
                this.realFps = this.currentFrame - this.sFrame;
                this.sFrame = this.currentFrame;
                this.sTime = t;
            }
        }
    });
})();