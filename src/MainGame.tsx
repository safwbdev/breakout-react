import { useEffect, useRef, useState } from "react";
import { MoveBall } from "./props/Ball";
import data from "./data";
import WallCollision from "./utils/WallCollision";
import Racquet from "./props/Racquet";
import Brick from "./props/Brick";
import BrickCollision from "./utils/BrickCollision";
import RacquetHit from "./utils/RacquetHit";
import ScoreBoard from "./props/ScoreBoard";
import AllBroken from "./utils/AllBroken";
import ResetBall from "./utils/ResetBall";

const Main = () => {
  const canvasRef = useRef(null); 
  const { ballData, racquetData, brickData, playerData } = data;
  const [gameOver, setGameOver] = useState(false)
  const [gameStart, setGameStart] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  
  const moveRacquet = (event:any) => racquetData.x = event.clientX - racquetData.width * 2;

  const startGame = ()=> {
    setGameStart(true);
  }
  const restartGame = ()=> {
    setGameStart(true);
    setGameOver(false);
  }
  
  useEffect(() => {
    let bricks:any = [];

    const render = () => {
      const canvas:any | null = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.height = window.innerHeight * 90 /100;
      canvas.width = window.innerWidth * 80 / 100;
      
      racquetData.y = canvas.height - 30;

      let brickSet = Brick(playerData.level, bricks, canvas, brickData);

      if (brickSet && brickSet.length > 0) {
        bricks = brickSet;        
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ScoreBoard(ctx, playerData, canvas);

      if(gameStart && playerData.lives === 0){
        setFinalScore(playerData.score)
        // alert(`GAMEOVER! You scored ${playerData.score} points`);
        setGameOver(true)
        // setGameStart(false);
        playerData.lives = 3;
        playerData.level = 1;
        playerData.score = 0;
        bricks.length = 0;
        ResetBall(ballData, canvas, racquetData);
      }
      
      bricks.map((brick:any) => brick.draw(ctx));
      
      MoveBall(ctx, ballData);

      AllBroken(bricks, playerData, canvas, ballData, brickData);
      
      WallCollision(ballData, playerData, canvas, racquetData);
      
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
          playerData.score += 10;
        }
      }
      
      Racquet(ctx, canvas, racquetData);
      RacquetHit(ballData, racquetData);      
      requestAnimationFrame(render);
    };

    if(gameStart){
      render();
    }
    
  }, [ballData, brickData, playerData, racquetData, gameStart]);

  return (
    <div>
      <canvas
        id="canvas"
        ref={canvasRef}
        onMouseMove={(e)=> moveRacquet(e)}
        />
      <div
        className="GameStartWindow"
        style={{  display: gameStart ? "none" : "flex"}}>
        <div
          className="GameStartInner"
          style={{
            width: `${window.innerWidth * 80 /100}px`,
            height: `${window.innerHeight * 90 /100}px`}}>
          <h1>{playerData.name}</h1>
          <p className="ghLink">
            <a href={playerData.link} target="_blank" rel="noreferrer">
              <i className="fab fa-github"></i> Check out Code
            </a>
          </p>
          <button onClick={()=>startGame()}>Start</button>
        </div>
      </div>
      <div
        className="GameStartWindow"
        style={{display: !gameOver ? "none" : "flex"}}>
        <div
          className="GameStartInner"
          style={{
            width: `${window.innerWidth * 80 /100}px`,
            height: `${window.innerHeight * 90 /100}px`}}>
          <h1>Game Over</h1>
          <h2>{finalScore} pts</h2>
          <p className="ghLink">
            <a href={playerData.link} target="_blank" rel="noreferrer">
              <i className="fab fa-github"></i> Check out Code
            </a>
          </p>
          <button onClick={()=>restartGame()}>Retry</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
