class Space {
  private canvas : HTMLCanvasElement;
  private ctx : CanvasRenderingContext2D;

  private playerX = 0;
  private playerY = 0;

  private obstacles = new Array<Obstacle>();

  private level = 0;
  private score = 0;
  private bestScore = 0;

  private bgRed = 8;
  private bgGreen = 8;
  private bgBlue = 72;

  constructor(selector) {
    this.canvas = document.querySelector(selector) as HTMLCanvasElement;
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

  private update() {
    this.render();
    this.moveObstacles();
    this.detectCollision();

    requestAnimationFrame(this.update);
  }

  private render() {
    this.ctx.fillStyle = `rgba(${this.bgRed}, ${this.bgGreen}, ${this.bgBlue})`;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.width);

    this.ctx.fillStyle = '#fff';
    this.ctx.beginPath();
    this.ctx.moveTo(this.playerX + 12.5,this.playerY);
    this.ctx.lineTo(this.playerX,this.playerY + 25);
    this.ctx.lineTo(this.playerX + 25,this.playerY + 25);
    this.ctx.fill();

    for (const obstacle of this.obstacles) {

      this.ctx.beginPath();
      this.ctx.moveTo(obstacle.positionX, obstacle.positionY);
      for (const shape of obstacle.shape) {
        this.ctx.lineTo(obstacle.positionX + shape.x,obstacle.positionY + shape.y);
      }
      this.ctx.fill();
    }

    this.ctx.font = 'bold 16px monospace';
    this.ctx.fillStyle = "#ffffff";
    this.ctx.fillText(`LEVEL: ${this.level + 1}, SCORE: ${this.score}, BEST: ${this.bestScore}`, 10, 20);
  }