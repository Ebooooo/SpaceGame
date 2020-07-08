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
  private input(event) {
    this.playerX = event.clientX - this.canvas.getBoundingClientRect().left;
    this.playerY = event.clientY - this.canvas.getBoundingClientRect().top;
  }

  private moveObstacles() {
    for(const obstacle of this.obstacles) {
      obstacle.moveDown();
    }

    if (this.obstacles.length < 10 + this.level * 3) {
      this.obstacles.push(new Obstacle(Math.random() * this.canvas.width, (Math.random() * -250) - 50, (Math.random() * 3) + 2));
    }
  }

  private detectCollision() {
    for(const obstacle of this.obstacles) {
      const distance = Math.sqrt(Math.pow(this.playerX - obstacle.positionX, 2) + Math.pow(this.playerY - obstacle.positionY, 2))

      if (distance < 32 / 1.5) {
        this.GameOver();
      }

      if (obstacle.positionY > this.canvas.height + 32) {
        this.obstacles = this.obstacles.filter(element => element !== obstacle);
        this.score++;

        if (this.bestScore < this.score) {
          this.bestScore = this.score;
        }

        if (this.score > 0 && this.score % 25 === 0) {
          this.level++;
          this.bgRed = Math.round(Math.random() * 100);
          this.bgBlue = Math.round(Math.random() * 100);
          this.bgGreen = Math.round(Math.random() * 100);
        }
      }
    }
  }

  private GameOver() {
    window.alert('Game over! Your score is ' + this.score + ' Try again!');
    this.obstacles = new Array<Obstacle>();
    this.score = 0;
    this.level = 0;
    this.playerX = this.canvas.width / 2;
    this.playerY = this.canvas.height - 32;
  }
}
