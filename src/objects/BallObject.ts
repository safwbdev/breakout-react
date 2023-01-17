export class Ball {
    x:number;
    y:number;
    rad:number;
    constructor(x:number, y:number, rad:number) {
      this.x = x;
      this.y = y;
      this.rad = rad;
    }
  
    draw(ctx:any) {
      ctx.beginPath();
      ctx.fillStyle = "lime";
      ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
      ctx.strokeStyle = "lime";
      ctx.strokeWidth = 4;
      ctx.fill();
      ctx.stroke();
    }
  }