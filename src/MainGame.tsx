import { useEffect, useRef } from "react";
import { MoveBall } from "./props/Ball";
import data from "./data";
import WallCollision from "./utils/WallCollision";
import Racquet from "./props/Racquet";
import Brick from "./props/Brick";
import BrickCollision from "./utils/BrickCollision";
import RacquetHit from "./utils/RacquetHit";

let bricks:any = [];
const { ballData, racquetData, brickData } = data;
const Main = () => {
  const canvasRef = useRef(null); 

  const moveRacquet = (event:any) => racquetData.x = event.clientX - racquetData.width * 2

  useEffect(() => {
    const render = () => {
      const canvas:any | null = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.height = window.innerHeight * 90 /100;
      canvas.width = window.innerWidth * 80 / 100;
      racquetData.y = canvas.height - 30;

      let brickSet = Brick(5, bricks, canvas, brickData);

      if (brickSet && brickSet.length > 0) {
        bricks = brickSet;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bricks.map((brick:any) => brick.draw(ctx));

      MoveBall(ctx, ballData);

      WallCollision(ballData, canvas);

      let brickCollision;

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballData, bricks[i]);

        if (brickCollision.hit && !bricks[i].broke) {
          if (brickCollision.axis === "X") {
            ballData.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === "Y") {
            ballData.dy *= -1;
            bricks[i].broke = true;
          }
          // playerData.score += 10;
        }
      }

      Racquet(ctx, canvas, racquetData);
      RacquetHit(ballData, racquetData);

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      onMouseMove={(e)=> moveRacquet(e)}
    />
  );
};

export default Main;
