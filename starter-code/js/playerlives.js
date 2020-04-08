class PlayerLives {
    constructor(ctx, canvasSize, num, imgSource) {
        this.ctx = ctx
        this.canvasSize = {
            width: canvasSize.width, 
            height: canvasSize.height
        }
        this.num = num
        this.lives = new Image()
        this.lives.src = imgSource
    }
    draw() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '30px Courier New'
        this.ctx.fillText(`LIVES:` , this.canvasSize.width - 300, 60)
        for (let i = 0; i < this.num; i++) {
            this.ctx.drawImage(this.lives, this.canvasSize.width - 180 + 55 * i, 25, 45, 45)
        }
    }
    removeLives() {
        this.num--
    } 
    addLives(){
        if(this.num < 3) {
            this.num++
        }
    }
}