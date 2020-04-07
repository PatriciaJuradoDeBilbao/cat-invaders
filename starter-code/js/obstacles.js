class Cat {

    constructor(ctx, posX, posY, obsWidth, obsHeight, canvasSize, imgSource){
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.obsWidth = obsWidth
        this.obsHeight = obsHeight
        this.vel = 5
        this.canvasSize = {
            width: canvasSize.width, 
            height: canvasSize.height
        }
        this.imgSource = imgSource
        this.bulletCat = []
    }
    draw() {
        this.cat = new Image()
        this.cat.src = this.imgSource
        this.cat.onload = () => this.ctx.drawImage(this.cat, this.posX, this.posY, this.obsWidth, this.obsHeight)
        this.move()
    }
    move() {
        this.posX >= this.canvasSize.width - this.obsWidth || this.posX <= 0 ? this.changeDirection() : null
        this.posX += this.vel
    } 
    changeDirection() {
        this.vel *= -1
        this.posY += 85
    }
    // shoot() {
    //     if(this.cat % 85 === 0) {
    //         this.bulletCat.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.playerWidth, this.playerHeight))
    //     }
    // }
    // clearBullets() {
    //     this.bulletCat = this.bulletCat.filter(bull => bull.posY <= 120)
    //   }
}
