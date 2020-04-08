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
        this.cat = new Image()
        this.cat.src = this.imgSource

    }
    draw() {
        this.ctx.drawImage(this.cat, this.posX, this.posY, this.obsWidth, this.obsHeight)
        this.bulletCat.forEach(bullet => bullet.draw())
        

    }
    // move() {
    //     this.posX >= this.canvasSize.width - this.obsWidth || this.posX <= 0 ? this.changeDirection() : null
    //     this.posX += this.vel
    // } 
    // changeDirection() {
    //     this.vel *= -1
    //     this.posY += 85 //este lo meto en el foreach
    // }
    shoot() {
        this.bulletCat.push(new BulletsCat(this.ctx, this.posX, this.posY, this.obsWidth, this.obsHeight))
    }
    clearBullets() {
        this.bulletCat = this.bulletCat.filter(bull => bull.posY <= 120)
      }
}
