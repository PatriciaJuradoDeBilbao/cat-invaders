class ScoreBoard {
    constructor() {
        thix.ctx = ctx
        this.score = 0
        this
    }
    drawScore() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '30px Courier New'
        this.ctx.fillText(`SCORE: < ${this.score} >`, 50, 60)
    }
    scorePoints() {
        this.score += 50
    }
    drawLives() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '30px Courier New'
        this.ctx.fillText(`LIVES:` , this.canvasSize.width - 250, 60)
        this.lives = new Image()
        this.lives = `./img/water-gun.png`
        this.lives.onload = () => this.ctx.drawImage(this.lives, this.canvasSize.width - 135, 25, 40, 40)
    }
}