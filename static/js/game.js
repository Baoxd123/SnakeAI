(function() {
    window.Game = Class.extend({
        init: function(paramsJSON) {
            this.fps = paramsJSON.fps || 60;
            this.timer = null;
            this.frameUtil = new FrameUtil();
            this.canvas = document.getElementById(paramsJSON.id);
            this.ctx = this.canvas.getContext("2d");
            this.snakeai = new Snake();
            this.ss = new Snake();
            this.snakeai2 = new SnakeAi();
            this.food = new Food();
            this.flag = 1;

            // this.sr = new StaticResouces();
            // this.sr.loadImages("r.json", function(alreadyLoadNum, allNum, imagesObj) {
            //     if (alreadyLoadNum == allNum) {
            //         this.run();
            //     } else {
            //         this.ctx.fillText("正在加载。。。。。");
            //     }
            // });
            //console.log(this.snakeai.snake.snakeArray);


        },
        run: function() {
            var self = this;
            console.log(this.ss.snake.snakeArray);
            this.food.foods = this.food.createfood();
            console.log(this.snakeai2.snake.snakeArray);
            console.log(this.food.foods);
            this.snakeai2.moveBFS();
            this.timer = setInterval(function() {
                self.mainloop();
            }, 1000 / self.fps);

        },
        mainloop: function() {
            // console.log(Math.random());

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            //this.ss.ifmove();
            //this.snakeai2.ifmove();
            // this.food.foods = this.food.createfood();
            this.food.drawFood();
            //this.frameUtil.update();
            this.ss.ifmove();
            this.ss.render();
            this.ss.update();
            this.snakeai2.render();
            this.snakeai2.update();
            this.showState();

            //console.log(this.frameUtil.realFps);
            // this.ctx.font = "40px 黑体";
            // this.ctx.fillText(this.frameUtil.realFps, 10, 40);

        },
        pause: function() {
            clearInterval(this.timer);
        },
        showState: function() {
            this.ctx.font = "40px 黑体";
            this.ctx.fillText(this.ss.snake.snakeArray.length, 10, 40);
        }
    });
})();