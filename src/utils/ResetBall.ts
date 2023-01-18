export default function ResetBall(ball:any, canvas:any, racquet:any) {
    ball.x = racquet.x;
    ball.y = racquet.y - 80;
    ball.dx = 6 * (Math.random() * 2 - 1);
    ball.dy = -6;
  }