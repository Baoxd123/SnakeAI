(function() {
    window.SnakeAi = Class.extend({
        init: function() {
            this.bodyImg = new Image();
            this.bodyImg.src = "../static/img/body2.png";
            this.headImg = new Image();
            this.headImg.src = "../static/img/head2.png";
            this.snake = {
                head: null,
                snakeArray: null,
                direction: "right"
            };
            this.snake.snakeArray = new Array();
            this.snake.snakeArray[0] = [Math.round(Math.random() * 30), Math.round(Math.random() * 30)];
            this.ok_place = null;
            this.chs = null;
            this.path = new Array();
            this.nowpos = 0;
            // this.render();
        },
        moveBFS: function() { // 获取新的 path 
            //存储蛇身位置
            var dirc = [
                [0, 1],
                [0, -1],
                [-1, 0],
                [1, 0]
            ];
            var snake2 = game.ss.snake.snakeArray;
            var snake = this.snake.snakeArray;
            var nowpos = this.nowpos;
            var path = this.path;
            var mat = new Array();
            for (var i = 0; i < 42; i++)
                mat[i] = new Array(30); // mat[i][j] 为 1 则表示坐标 (i, j) 处存在蛇身。
            for (var i = 0; i < snake.length; i++)
                mat[snake[i][0]][snake[i][1]] = 1; // 扫描一遍蛇身数组，处理出 mat[][]
            for (var i = 0; i < snake2.length; i++)
                mat[snake2[i][0]][snake2[i][1]] = 1;
            //console.log(mat);
            //初始化队列
            var queue = new Array(10000),
                head = 0,
                tail = 0;

            //存储最短路劲长度、倒推求最短路径
            var dis = new Array(),
                lst = new Array();
            for (var i = 0; i < 42; i++) {
                dis[i] = new Array(), lst[i] = new Array();
                for (var j = 0; j < 25; j++) {
                    dis[i][j] = -1;
                    lst[i][j] = -1;
                }
            } // 初始化 dis[][] 与 lst[][]，分别用于保存最短路径长度和倒推实现求具体最短路径。
            dis[this.snake.snakeArray[0][0]][this.snake.snakeArray[0][1]] = 0;

            queue[tail++] = [this.snake.snakeArray[0][0], this.snake.snakeArray[0][1]];
            while (head < tail) {
                var ele = queue[head++];
                for (var i = 0; i < dirc.length; i++) {
                    var nx = ele[0] + dirc[i][0],
                        ny = ele[1] + dirc[i][1];
                    //console.log(nx, ny);
                    if (nx < 0 || nx >= 42 || ny < 0 || ny >= 25 || mat[nx][ny] == 1 || dis[nx][ny] != -1) continue;
                    dis[nx][ny] = dis[ele[0]][ele[1]] + 1;
                    lst[nx][ny] = [ele[0], ele[1]];
                    queue[tail++] = [nx, ny];
                }
            } // bfs 算出最短路径
            //console.log(mat);
            this.ok_place = new Array();
            for (var i = 0; i < 42; i++) {
                for (var j = 0; j < 25; j++) {
                    if (dis[i][j] == -1 || mat[i][j] == 1) continue;
                    this.ok_place.push([i, j]);
                }
            } // 求出所有合法（从当前蛇头位置出发可达）的奖励点
            if (this.ok_place.length == 0) {
                alert('the red win');
                // location.reload();
            } // 失败
            // var chs = Math.round(Math.random() * (this.ok_place.length - 1)); // 随机选取一个位置作为奖励点
            // this.chs = chs;
            if (game.flag) {
                var chs = Math.round(Math.random() * (this.ok_place.length - 1)); // 随机选取一个位置作为奖励点
                this.chs = chs;
                game.flag = 0;
                game.food.foods.x = this.ok_place[chs][0] * 20;
                game.food.foods.y = this.ok_place[chs][1] * 20;
                //console.log([game.food.foods.x, game.food.foods.y]);
            }
            this.path = new Array();
            var x = game.food.foods.x / 20,
                y = game.food.foods.y / 20;
            while (lst[x][y] != -1) { // 倒推法计算出到该位置的最短路径
                this.path.push([x, y]);
                var newX = lst[x][y][0],
                    newY = lst[x][y][1];
                x = newX, y = newY;
            }
            this.nowpos = this.path.length - 1;

        },
        update: function() {
            this.moveBFS();
            var sver = this.path[this.path.length - 1];
            var x = sver[0] * 20;
            var y = sver[1] * 20;
            if (x == game.food.foods.x && y == game.food.foods.y) {
                this.snake.snakeArray.splice(0, 0, sver);
                game.flag = 1;
            } else {
                this.snake.snakeArray.pop();
                this.snake.snakeArray.splice(0, 0, sver);
            }

        },
        virtualUpdate: function(now) {
            var snake2 = new Array();
            var snake = this.snake.snakeArray;
            for (var i = 0; i < this.snake.snakeArray.length; i++) {
                snake2.splice(0, 0, snake[i]);
            }
            if (now == 0) { // 触奖
                snake.splice(0, 0, this.path[0]);
                if (this.findTail(snake2)) {
                    return true;
                } else return false;
                // game.food.foods = game.food.createfood();

                // console.log(snake[0][1]);
                // snake[0][2] = bonusColor;
            } else { // 普通地行进
                // ctx.fillStyle = '#000000';
                // ctx.fillRect(snake[snake.length - 1][0] * 20, snake[snake.length - 1][1] * 20, 20, 20);
                var sver = this.path[this.nowpos];
                // console.log(snake[0][1]);
                // this.render();
                // sver[2] = snake[snake.length - 1][2];
                snake2.pop();
                snake2.splice(0, 0, sver);
            }
            if (now == 0) {
                // console(this.nowpos);
                this.moveBFS();

            } else this.nowpos--;
            // console.log(snake[0]);
            // console.log(game.food.foods.x);
        },
        findTail: function(snake) {
            var dirc = [
                [0, 1],
                [0, -1],
                [-1, 0],
                [1, 0]
            ];
            var mat = new Array();
            // console.log(snake[0][2]);
            for (var i = 0; i < 42; i++)
                mat[i] = new Array(30); // mat[i][j] 为 1 则表示坐标 (i, j) 处存在蛇身。
            for (var i = 0; i < snake.length; i++)
                mat[snake[i][0]][snake[i][1]] = 1;
            mat[snake[snake.length - 1][0]][snake[snake.length - 1][1]] = 0;
            // 扫描一遍蛇身数组，处理出 mat[][]

            //初始化队列
            var queue = new Array(10000),
                head = 0,
                tail = 0;

            //存储最短路劲长度、倒推求最短路径
            var dis = new Array(),
                lst = new Array();
            for (var i = 0; i < 42; i++) {
                dis[i] = new Array(), lst[i] = new Array();
                for (var j = 0; j < 25; j++) {
                    dis[i][j] = -1;
                    // lst[i][j] = -1;
                }
            } // 初始化 dis[][] 与 lst[][]，分别用于保存最短路径长度和倒推实现求具体最短路径。
            dis[snake[0][0]][snake[0][1]] = 0;
            // dis[snake[snake.length - 1][0]][snake[snake.length - 1][1]] = 0;
            queue[tail++] = [snake[0][0], snake[0][1]];
            while (head < tail) {
                var ele = queue[head++];
                for (var i = 0; i < dirc.length; i++) {
                    var nx = ele[0] + dirc[i][0],
                        ny = ele[1] + dirc[i][1];
                    if (nx < 0 || nx >= 42 || ny < 0 || ny >= 25 || mat[nx][ny] == 1 || dis[nx][ny] != -1) continue;
                    dis[nx][ny] = dis[ele[0]][ele[1]] + 1;
                    // lst[nx][ny] = [ele[0], ele[1]];
                    queue[tail++] = [nx, ny];
                }
            } // bfs 算出最短路径
            // console.log(dis[snake[snake.length - 1][0]][snake[snake.length - 1][1]]);
            if (dis[snake[snake.length - 1][0]][snake[snake.length - 1][1]] == -1)
                return 0;
            else return 1;
        },
        draw: function(section) {
            game.ctx.drawImage(this.bodyImg, section[0] * 20 - 3, section[1] * 20 - 3, 26, 26);
        },
        render: function() {
            if (this.snake.direction == "left" || this.snake.direction == "right") {
                this.headImg.src = "../static/img/head2.png";
                // console.log(this.snake.snakeArray[0][0]);
                game.ctx.drawImage(this.headImg, this.snake.snakeArray[0][0] * 20 - 3, this.snake.snakeArray[0][1] * 20 - 3, 26, 26);
            } else {
                this.headImg.src = "../static/img/body2.png";
                game.ctx.drawImage(this.headImg, this.snake.snakeArray[0][0] * 20 - 3, this.snake.snakeArray[0][1] * 20 - 3, 26, 26);
            }
            for (var i = 1; i < this.snake.snakeArray.length; i++) {
                var section = this.snake.snakeArray[i];
                this.draw(section);
            }
            // drwaGrid();
            //this.drawGrid('black', 20, 20);
        },
        gameOver: function() {
            var canvasWidth = canvas.width;
            var canvasHeigh = canvas.height;
            var head = this.snake.snakeArray[0];
            if (head[0] < 0 || head[1] < 0 || head[0] > canvasWidth - 20 || head[1] > canvasHeigh - 20) {

                game.pause();

                //return true;
            }

            for (var i = 1; i < game.ss.snake.snakeArray.length; i++) {
                var section = game.ss.snake.snakeArray[i];
                if (section[0] == head[0] && section[1] == head[1]) {

                    game.pause();

                    //return true;
                }
            }

            return false;
        },
        isEat: function() {
            var head = game.ss.snake.snakeArray[0];
            if (game.food.foods.x == snake[0] && game.food.foods.y == snake[1]) {
                return true;
            } else {
                return false;
            }
        }



    });
})();