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