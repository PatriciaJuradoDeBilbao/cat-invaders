class ScorePoints {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = {
            width: canvasSize.width, 
            height: canvasSize.height
        }
        this.score = 0
    }
    addPoints() {
        this.score += 50
    }
    powerUpPoints() {
        this.score += 250
    }
    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '30px Courier New'
        this.ctx.fillText(`SCORE: < ${this.score} >`, 50, 60)
    }
}


