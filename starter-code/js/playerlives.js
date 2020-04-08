class PlayerLives {
    constructor(ctx, canvasSize, num, imgSource) {
        this.ctx = ctx
        this.canvasSize = {
            width: canvasSize.width, 
            height: canvasSize.height
        }
        this.score = 0
        this.num = num
        this.lives = new Image()
        this.lives.src = imgSource
    }
    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '30px Courier New'
        this.ctx.fillText(`LIVES:` , this.canvasSize.width - 300, 60)
        for (let i = 0; i < this.num; i++) {
            this.ctx.drawImage(this.lives, this.canvasSize.width - 175 + 50 * i, 35, 30, 30)
        }
    }
    removeLives() {
        this.num--
    } 
}