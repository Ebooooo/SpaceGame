var Obstacle = /** @class */ (function () {
    function Obstacle(initialX, initialY, speed) {
        if (speed === void 0) { speed = 4; }
        this.positionX = 0;
        this.positionY = 0;
        this.speed = 4;
        this.shape = [];
        this.positionX = initialX;
        this.positionY = initialY;
        this.speed = speed;
        var shapeSides = Math.random() * 5;
        for (var i = 0; i < shapeSides; i++) {
            this.shape.push({
                x: -8 + Math.random() * -8,
                y: 8 + Math.random() * 8,
            });
            this.shape.push({
                x: 8 + Math.random() * 8,
                y: 8 + Math.random() * 8
            });
            this.shape.push({
                x: 8 + Math.random() * 8,
                y: -8 + Math.random() * -8,
            });
            this.shape.push({
                x: -8 + Math.random() * -8,
                y: -8 + Math.random() * -8,
            });
        }
    }
    Obstacle.prototype.moveDown = function () {
        this.positionY = this.positionY + this.speed;
    };
    return Obstacle;
}());
var Space = /** @class */ (function () {
    function Space(selector) {
        this.playerX = 0;
        this.playerY = 0;
        this.obstacles = new Array();
        this.level = 0;
        this.score = 0;
        this.bestScore = 0;
        this.bgRed = 8;
        this.bgGreen = 8;
        this.bgBlue = 72;
        this.canvas = document.querySelector(selector);
        this.ctx = this.canvas.getContext('2d');
        this.update = this.update.bind(this);
        this.input = this.input.bind(this);
        this.moveObstacles = this.moveObstacles.bind(this);
        this.detectCollision = this.detectCollision.bind(this);
        this.playerX = this.canvas.width / 2;
        this.playerY = this.canvas.height - 32;
        this.canvas.addEventListener('mousemove', this.input);
        this.update();
    }
    Space.prototype.update = function () {
        this.render();
        this.moveObstacles();
        this.detectCollision();
        requestAnimationFrame(this.update);
    };
    Space.prototype.render = function () {
        this.ctx.fillStyle = "rgba(" + this.bgRed + ", " + this.bgGreen + ", " + this.bgBlue + ")";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);
        this.ctx.fillStyle = '#fff';
        this.ctx.beginPath();
        this.ctx.moveTo(this.playerX + 12.5, this.playerY);
        this.ctx.lineTo(this.playerX, this.playerY + 25);
        this.ctx.lineTo(this.playerX + 25, this.playerY + 25);
        this.ctx.fill();
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            this.ctx.beginPath();
            this.ctx.moveTo(obstacle.positionX, obstacle.positionY);
            for (var _b = 0, _c = obstacle.shape; _b < _c.length; _b++) {
                var shape = _c[_b];
                this.ctx.lineTo(obstacle.positionX + shape.x, obstacle.positionY + shape.y);
            }
            this.ctx.fill();
        }
        this.ctx.font = 'bold 16px monospace';
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillText("LEVEL: " + (this.level + 1) + ", SCORE: " + this.score + ", BEST: " + this.bestScore, 10, 20);
    };
    Space.prototype.input = function (event) {
        this.playerX = event.clientX - this.canvas.getBoundingClientRect().left;
        this.playerY = event.clientY - this.canvas.getBoundingClientRect().top;
    };
    Space.prototype.moveObstacles = function () {
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            obstacle.moveDown();
        }
        if (this.obstacles.length < 10 + this.level * 3) {
            this.obstacles.push(new Obstacle(Math.random() * this.canvas.width, (Math.random() * -250) - 50, (Math.random() * 3) + 2));
        }
    };
    Space.prototype.detectCollision = function () {
        var _loop_1 = function (obstacle) {
            var distance = Math.sqrt(Math.pow(this_1.playerX - obstacle.positionX, 2) + Math.pow(this_1.playerY - obstacle.positionY, 2));
            if (distance < 32 / 1.5) {
                this_1.GameOver();
            }
            if (obstacle.positionY > this_1.canvas.height + 32) {
                this_1.obstacles = this_1.obstacles.filter(function (element) { return element !== obstacle; });
                this_1.score++;
                if (this_1.bestScore < this_1.score) {
                    this_1.bestScore = this_1.score;
                }
                if (this_1.score > 0 && this_1.score % 25 === 0) {
                    this_1.level++;
                    this_1.bgRed = Math.round(Math.random() * 100);
                    this_1.bgBlue = Math.round(Math.random() * 100);
                    this_1.bgGreen = Math.round(Math.random() * 100);
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.obstacles; _i < _a.length; _i++) {
            var obstacle = _a[_i];
            _loop_1(obstacle);
        }
    };
    Space.prototype.GameOver = function () {
        window.alert('Game over! Your score is ' + this.score + ' Try again!');
        this.obstacles = new Array();
        this.score = 0;
        this.level = 0;
        this.playerX = this.canvas.width / 2;
        this.playerY = this.canvas.height - 32;
    };
    return Space;
}());
