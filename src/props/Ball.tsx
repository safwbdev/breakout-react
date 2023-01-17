import { Ball } from "../objects/BallObject";

export function MoveBall(ctx:any, ballObj:any) {
  const data = new Ball(ballObj.x, ballObj.y, ballObj.rad);
  
  data.draw(ctx);
  
  ballObj.x += ballObj.dx;
  ballObj.y += ballObj.dy;
}
