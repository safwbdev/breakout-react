export default function ScoreBoard(ctx:any, player:any, canvas:any){
    ctx.font ="20px Arial"
    ctx.fillStyle ="white"
    ctx.fillText(`${player.name}`, 20, 30)

    ctx.font ="20px Arial"
    ctx.fillStyle ="red"
    let gap = 0;
    for (let i = 0; i < player.lives; i++) {
        ctx.fillText(`O`, canvas.width / 2 + gap, 30)
        gap+=30;        
    }

    ctx.font ="20px Arial"
    ctx.fillStyle ="white"
    ctx.fillText(`Score: ${player.score}`, canvas.width - 240, 30)
}