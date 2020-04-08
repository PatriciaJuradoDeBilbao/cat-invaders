class ExtraLives {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = {
            width: canvasSize.width, 
            height: canvasSize.height
        }
        this.extraLiveImg = new Image()
        this.extraLiveImg.src = `./img/lives-pixel-heart-png`
        this.posX = Math.floor(Math.random() * this.canvasSize.width)
        this.posY = 100
        this.width = 45
        this.height = 45
        this.vel = 20
     
    }
    draw() {
        this.ctx.drawImage(this.extraLiveImg, this.posX, this.posY, this.width, this.height)
        this.move()
    }
    move() {
        this.posY += this.vel
    }
}