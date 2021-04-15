(function() {
    window.Food = Class.extend({
        init: function() {
            this.foodImg = new Image();
            this.foodImg.src = "../static/img/food.png";
            this.foods = null;
        },
        createfood: function() {
            var isOnSnake = true;
            var snakeArray = game.ss.snake.snakeArray;
            while (isOnSnake) {
                isOnSnake = false;
                var widthRange = canvas.width / 20 - 1;
                var heightRange = canvas.height / 20 - 1;
                var x = Math.round(Math.random() * widthRange) * 20;
                var y = Math.round(Math.random() * heightRange) * 20;
                for (var i = 0; i < snakeArray.length; i++) {
                    if (snakeArray[i][0] == x && snakeArray[i][1] == y) {
                        isOnSnake = true;
                        break;
                    }
                }

            }
            return { x: x, y: y }
        },
        drawFood: function() {
            game.ctx.drawImage(this.foodImg, this.foods.x - 3, this.foods.y - 3, 26, 26);
        }

    });
})();