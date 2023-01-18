import { Ball } from "../objects/BallObject";

export function MoveBall(ctx:any, ball:any) {
  const data = new Ball(ball.x, ball.y, ball.rad);
  
  data.draw(ctx);
  
  ball.x += ball.dx;
  ball.y += ball.dy;
}
