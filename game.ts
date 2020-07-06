class Obstacle {
  public positionX = 0;
  public positionY = 0;
  private speed = 4;
  public shape = [];

  constructor(initialX, initialY, speed = 4) {
    this.positionX = initialX;
    this.positionY = initialY;
    this.speed = speed;

    const shapeSides = Math.random() * 5;

    for (let i = 0; i < shapeSides; i++) {
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

  public moveDown() {
    this.positionY = this.positionY + this.speed;
  }
}