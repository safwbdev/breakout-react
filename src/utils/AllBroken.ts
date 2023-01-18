export default function AllBroken(bricks:any, player:any, canvas:any, ball:any, brickData:any){
    let total = 0;
    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].broke) {
            total++
        }
    }

    if (total === bricks.length){
        player.level++;
        ball.y = canvas.height - 20;
        brickData.y = 50

    }
}