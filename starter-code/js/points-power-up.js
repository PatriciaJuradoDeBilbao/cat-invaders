class Points {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = {
            width: canvasSize.width, 
            height: canvasSize.height
        }
        this.pointsImg = new Image()
        this.pointsImg.src = `./img/points-power-up.png`
        this.posX = 0
        this.posY = 100
        this.width = 125
        this.height = 60
        this.vel = 20
     
    }
    draw() {
        this.ctx.drawImage(this.pointsImg, this.posX, this.posY, this.width, this.height)
        this.move()
    }
    move() {
        this.posX += this.vel
    }
}