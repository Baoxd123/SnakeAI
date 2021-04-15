(function() {
    window.otherUtil = Class.extend({
        init: function() {
            this.up = document.getElementById("up");
            this.down = document.getElementById("down");
            this.left = document.getElementById("left");
            this.right = document.getElementById("right");
            this.run = document.getElementById("run");
            down.onclick = function() {
                if (game.snakeai.snake.direction != "up")
                    game.snakeai.snake.direction = "down";
            }
            up.onclick = function() {
                if (game.snakeai.snake.direction != "down")
                    game.snakeai.snake.direction = "up";
            }
            left.onclick = function() {
                if (game.snakeai.snake.direction != "right")
                    game.snakeai.snake.direction = "left";
            }
            right.onclick = function() {
                if (game.snakeai.snake.direction != "left")
                    game.snakeai.snake.direction = "right";
            }
            run.onclick = function() {
                game.flag = 1;
                $("#main #start").hide();
                $("#main #gameScreen").show();
                // game.snakeai.init();
                // game.snakeai2.init();
                game.run();
            }
            $(function() {

                $('.tab-menu li').click(function() {
                    $(this).addClass('active').siblings().removeClass('active');
                    //          $('.tab-top li').eq($(this).index()).addClass('active').siblings().removeClass('active');  tab按钮第二种写法
                    var index = $(this).index();
                    // $("#input div").eq(1).show().siblings().hide();
                    var index2 = 1 - index;
                    console.log(index2);
                    if (index == 0) {
                        $("#input #codeA").show();
                        $("#input #control").hide();
                        document.removeEventListener("keydown", keyClick);
                    } else {
                        $("#input #codeA").hide();
                        $("#input #control").show();
                        document.addEventListener("keydown", keyClick);
                    }
                })
            })

            function keyClick(e) {
                var keycode = e.keyCode;

                if (keycode == 83 && game.snakeai.snake.direction != "up") {
                    down.style.backgroundImage = "url('../static/img/control/up2.png')";
                    game.snakeai.snake.direction = "down";
                    setInterval(function() { down.style.backgroundImage = "url('../static/img/control/up.png')" }, 500);
                } else if (keycode == 87 && game.snakeai.snake.direction != "down") {
                    up.style.backgroundImage = "url('../static/img/control/up2.png')";
                    game.snakeai.snake.direction = "up";
                    setInterval(function() { up.style.backgroundImage = "url('../static/img/control/up.png')" }, 500);
                } else if (keycode == 68 && game.snakeai.snake.direction != "left") {
                    right.style.backgroundImage = "url('../static/img/control/up2.png')";
                    game.snakeai.snake.direction = "right";
                    setInterval(function() { right.style.backgroundImage = "url('../static/img/control/up.png')" }, 500);
                } else if (keycode == 65 && game.snakeai.snake.direction != "right") {
                    left.style.backgroundImage = "url('../static/img/control/up2.png')";
                    game.snakeai.snake.direction = "left";
                    setInterval(function() { left.style.backgroundImage = "url('../static/img/control/up.png')" }, 500);
                }
                e.preventDefault();
            }
        }
    });
})();