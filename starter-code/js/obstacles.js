class Cat {
    constructor(ctx, posX, posY, obsWidth, obsHeight, canvasSize, imgSource){
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.obsWidth = obsWidth
        this.obsHeight = obsHeight
        this.vel = 3
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
    shoot() {
        this.bulletCat.push(new BulletsCat(this.ctx, this.posX, this.posY, this.obsWidth, this.obsHeight))
    }
    clearBullets() {
        this.bulletCat = this.bulletCat.filter(bull => bull.posY >= canvasSize.height)
      }
}
