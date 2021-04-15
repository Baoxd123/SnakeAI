// new_element = document.createElement("script");
// new_element.setAttribute("type", "text/javascript");
// new_element.setAttribute("src", "./js/if.js"); // 在这里引入了if.js
// document.body.appendChild(new_element);
(function() {
    window.Snake = Class.extend({
        init: function() {
            this.bodyImg = new Image();
            this.bodyImg.src = "../static/img/body1.png";
            this.headImg = new Image();
            this.headImg.src = "../static/img/head1.png";
            this.snake = {
                head: null,
                snakeArray: null,
                direction: "right"
            };
            this.snake.snakeArray = new Array();

            // // this.snake.snakeArray[0] = [Math.round(Math.random() * 30), Math.round(Math.random() * 30)];
            //this.snake.snakeArray.splice(0, 0, [Math.round(Math.random() * 40), Math.round(Math.random() * 40)]);
            this.snake.snakeArray[0] = [Math.round(Math.random() * 30), Math.round(Math.random() * 30)];
            console.log(this.snake.snakeArray);
            // var head = this.snake.snakeArray[0];
            // this.snake.head = head;
            // this.render();
        },
        update: function() {
            var snake = this.snake.snakeArray;


            //snake.splice(0, 0, snake[0]);
            var x = snake[0][0],
                y = snake[0][1];
            switch (this.snake.direction) {
                case "up":
                    {
                        y = snake[0][1] - 1;
                        break;
                    }
                case "down":
                    {
                        y = snake[0][1] + 1;
                        break;
                    }
                case "left":
                    {
                        x = snake[0][0] - 1;
                        break;
                    }
                case "right":
                    {
                        x = snake[0][0] + 1;
                        break;
                    }
            }

            if (this.isEat()) {
                game.flag = 1;
                snake.splice(0, 0, [x, y]);
                //game.food.foods = game.food.createfood();
            } else {
                snake.pop();
                snake.splice(0, 0, [x, y]);
            }
            console.log(snake);
            if (this.gameOver()) {
                // cancelAnimationFrame(globalID);
                //game.pause();
                alert("the blue win");
                game.pause();
                $.get("data/", { 'name': 'jack', 'score': this.snake.snakeArray.length - 4 }, function(ret) {

                    })
                    // flag = 0;
                    // $("#gameScreen").hide();
                    // $("#start").show();
            }
        },
        draw: function(section) {
            game.ctx.drawImage(this.bodyImg, section[0] * 20 - 3, section[1] * 20 - 3, 26, 26);
        },
        render: function() {
            //console.log("yes");
            var snakeArray = this.snake.snakeArray;
            //game.ctx.drawImage(this.headImg, snakeArray[0][0] * 20 - 3, snakeArray[0][1] * 20 - 3, 26, 26);
            if (this.snake.direction == "left" || this.snake.direction == "right") {
                console.log("yes");
                this.headImg.src = "../static/img/head1.png";
                game.ctx.drawImage(this.headImg, snakeArray[0][0] * 20 - 3, snakeArray[0][1] * 20 - 3, 26, 26);
            } else {
                this.headImg.src = "../static/img/head2.png";
                game.ctx.drawImage(this.headImg, snakeArray[0][0] * 20 - 3, snakeArray[0][1] * 20 - 3, 26, 26);
            }
            for (var i = 1; i < snakeArray.length; i++) {
                var section = snakeArray[i];
                this.draw(section);
            }
            // drwaGrid();
            this.drawGrid('black', 20, 20);
        },
        gameOver: function() {
            console.log("dead");
            console.log(this.snake.snakeArray.length);
            var canvasWidth = canvas.width;
            var canvasHeigh = canvas.height;
            var ai = game.snakeai2.snake.snakeArray;
            var head = game.ss.snake.snakeArray[0];
            if (head[0] < 0 || head[1] < 0 || head[0] * 20 > canvasWidth - 20 || head[1] * 20 > canvasHeigh - 20) {
                return true;
            }

            for (var i = 1; i < game.ss.snake.snakeArray.length; i++) {
                var section = game.ss.snake.snakeArray[i];
                if (section[0] == head[0] && section[1] == head[1]) {
                    return true;
                }
            }
            for (var i = 1; i < ai.length; i++) {
                var section = ai[i];
                if (section[0] == head[0] && section[1] == head[1]) {
                    return true;
                }
            }

            return false;
        },
        isEat: function() {
            console.log("eat");
            if (game.food.foods.x == this.snake.snakeArray[0][0] * 20 && game.food.foods.y == this.snake.snakeArray[0][1] * 20) {
                return true;
            } else {
                return false;
            }
        },
        drawGrid: function(color, stepx, stepy) {    
            //game.ctx.save();
            game.ctx.fillStyle = 'black';    
            // game.ctx.fillRect(0, 0, game.ctx.canvas.width, game.ctx.canvas.height);    
            game.ctx.lineWidth = 0.5;    
            game.ctx.strokeStyle = color;    
            for (var i = stepx; i < game.ctx.canvas.width; i += stepx) {        
                game.ctx.beginPath();        
                game.ctx.moveTo(i, 0);        
                game.ctx.lineTo(i, game.ctx.canvas.height);        
                game.ctx.closePath();        
                game.ctx.stroke();    
            }    
            for (var j = stepy; j < game.ctx.canvas.height; j += stepy) {        
                game.ctx.beginPath();        
                game.ctx.moveTo(0, j);        
                game.ctx.lineTo(game.ctx.canvas.width, j);        
                game.ctx.closePath();        
                game.ctx.stroke();    
            }    
        },
        ifmove: function() {
            var codes = editor.getValue();
            //console.log(codes);
            eval(codes);
        },
        if_getState: function() {
            var arr = [];
            for (var i = 0; i < this.snake.snakeArray.length; i++) {
                arr.unshift([this.snake.snakeArray[i][0], this.snake.snakeArray[i][1]]);
            }
            var sarr = this.snake.snakeArray;
            // 前方危险

            var x = (this.snake.direction == "right" && sarr[0][0] * 20 + 20 >= canvas.width) ||
                (this.snake.direction == "left" && sarr[0][0] * 20 - 20 < 0) ||
                (this.snake.direction == "up" && sarr[0][1] * 20 - 20 < 0) ||
                (this.snake.direction == "down" && sarr[0][1] * 20 + 20 >= canvas.height);
            // 右侧危险
            var y = (this.snake.direction == "right" && sarr[0][1] * 20 + 20 >= canvas.height) ||
                (this.snake.direction == "left" && sarr[0][1] * 20 - 20 < 0) ||
                (this.snake.direction == "up" && sarr[0][0] * 20 + 20 >= canvas.width) ||
                (this.snake.direction == "down" && sarr[0][0] * 20 - 20 < 0);
            // 左侧危险
            var z = (this.snake.direction == "right" && sarr[0][1] * 20 - 20 < 0) ||
                (this.snake.direction == "left" && sarr[0][1] * 20 + 20 >= canvas.height) ||
                (this.snake.direction == "up" && sarr[0][0] * 20 - 20 < 0) ||
                (this.snake.direction == "down" && sarr[0][0] * 20 + 20 >= canvas.width);

            // 身体碰撞前方危险
            var ahead = (this.snake.direction == "right" && this.headvarr(20, 0)) ||
                (this.snake.direction == "left" && this.headvarr(-20, 0)) ||
                (this.snake.direction == "up" && this.headvarr(0, -20)) ||
                (this.snake.direction == "down" && this.headvarr(0, 20));
            // 身体碰撞右侧危险
            var ri = (this.snake.direction == "right" && this.headvarr(0, 20)) ||
                (this.snake.direction == "left" && this.headvarr(0, -20)) ||
                (this.snake.direction == "up" && this.headvarr(20, 0)) ||
                (this.snake.direction == "down" && this.headvarr(-20, 0));
            // 身体碰撞左侧危险
            var le = (this.snake.direction == "right" && this.headvarr(0, -20)) ||
                (this.snake.direction == "left" && this.headvarr(0, 20)) ||
                (this.snake.direction == "up" && this.headvarr(-20, 0)) ||
                (this.snake.direction == "down" && this.headvarr(20, 0));


            var a = this.snake.direction == "left";
            var b = this.snake.direction == "right";
            var c = this.snake.direction == "up";
            var d = this.snake.direction == "down";


            var p = game.food.foods.x < sarr[0][0] * 20;
            var q = game.food.foods.x > sarr[0][0] * 20;
            var m = game.food.foods.y < sarr[0][1] * 20;
            var n = game.food.foods.y > sarr[0][1] * 20;

            var state = [x, y, z, ahead, ri, le, a, b, c, d, p, q, m, n];
            return state;
        },

        turn_left: function() {
            if (this.snake.direction == "left")
                this.snake.direction = "down";
            else if (this.snake.direction == "right")
                this.snake.direction = "up";
            else if (this.snake.direction == "up")
                this.snake.direction = "left";
            else if (this.snake.direction == "down")
                this.snake.direction = "right";
        },

        turn_right: function() {
            if (this.snake.direction == "left")
                this.snake.direction = "up";
            else if (this.snake.direction == "right")
                this.snake.direction = "down";
            else if (this.snake.direction == "up")
                this.snake.direction = "right";
            else if (this.snake.direction == "down")
                this.snake.direction = "left";
        },

        headvarr: function(m, n) {
            var flag = 0;
            for (var i = 0; i < this.snake.snakeArray.length; i++) {
                if ((this.snake.snakeArray[0][0] * 20 + m == this.snake.snakeArray[i][0] * 20) && (this.snake.snakeArray[0][1] * 20 + n == this.snake.snakeArray[i][1] * 20)) {
                    flag = 1;
                    return flag;
                }
            }
            var s = game.snakeai2.snake.snakeArray;
            for (var i = 0; i < s.length; i++) {
                if ((this.snake.snakeArray[0][0] * 20 + m == s[i][0] * 20) && (this.snake.snakeArray[0][1] * 20 + n == s[i][1] * 20)) {
                    flag = 1;
                    return flag;

                }
            }
            return flag;

        },
        ahead: function(sh, d) {
            switch (d) {
                case "up":
                    {
                        // this.snake[0][1] = this.snake[0][1] - 20;
                        // break;
                        var ds = sh[1] - 1;
                        return ds;
                    }
                case "down":
                    {
                        // this.snake[0][1] = this.snake[0][1] + 20;
                        // break;
                        var ds = sh[1] + 1;
                        return ds;
                    }
                case "left":
                    {
                        // this.snake[0][0] = this.snake[0][0] - 20;
                        // break;
                        var ds = sh[0] - 1;
                        return ds;
                    }
                case "right":
                    {
                        // this.snake[0][0] = this.snake[0][0] + 20;
                        // break;
                        var ds = sh[0] + 1;
                        return ds;
                    }
            }
        },

        arriveAtSameTime: function() {
            var sh = game.snakeai2.snake.snakeArray[0];
            var shd = game.snakeai2.snake.direction;
            var sh2 = this.snake.snakeArray[0];
            var sh2d = this.snake.direction;
            if (this.ahead(sh, shd) == this.ahead(sh2, sh2d))
                return true;
        }



    });
})();
// var move = this.if_getState();
// if (move[0] == 1 || move[3] == 1 || this.arriveAtSameTime()) //前方危险（或身体或墙壁），转向
// {
//     if ((move[1] == 1 || move[4] == 1) && (move[2] == 1 || move[5] == 1));
//     else if (move[1] == 1 || move[4] == 1) this.turn_left();
//     else if (move[2] == 1 || move[5] == 1) this.turn_right();
//     else this.turn_right();
// }
// //move[10]+move[11]+move[12]+move[13] == 1确保只有一个方向有食物
// //move[1]+move[2]+move[4]+move[5]<2，蛇两侧危险（或身体或墙壁），不吃豆子
// //move[4]+move[5] == 0，蛇一侧危险，食物在另一侧，避免蛇去吃
// else if ((move[10] + move[11] + move[12] + move[13] == 1) && (move[1] + move[2] + move[4] + move[5] < 2) && (move[4] + move[5] == 0)) {
//     if (move[10] == 1 && this.snake.direction != "right")
//     // # 食物在左，且移动方向不为右
//         this.snake.direction = "left";
//     else if (move[10] == 1 && this.snake.direction == "right")
//     // # 食物在左，且移动方向为右
//         this.snake.direction = "down";
//     else if (move[11] == 1 && this.snake.direction != "left")
//     // # 食物在右，方向不为左
//         this.snake.direction = "right";
//     else if (move[11] == 1 && this.snake.direction == "left")
//     // # 食物在右，方向为左
//         this.snake.direction = "up";
//     else if (move[12] == 1 && this.snake.direction != "down")
//     // # 上
//         this.snake.direction = "up";
//     else if (move[12] == 1 && this.snake.direction == "down")
//         this.snake.direction = "right";
//     else if (move[13] == 1 && this.snake.direction != "up")
//     // # 下
//         this.snake.direction = "down";
//     else if (move[13] == 1 && this.snake.direction == "up")
//         this.snake.direction = "left";
// }