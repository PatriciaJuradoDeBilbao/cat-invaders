class BulletsCat {
    constructor(ctx, catPosX, catPosY, catPosY0, catWidth, catHeight) {
        this.ctx = ctx
        this.posX = catPosX + catHeight  
        this.posY = catPosY + catWidth
        this.catPosY0 = catPosY0
        this.catHeight = catHeight
        this.catWidth = catWidth
        this.bulletCatWidth = this.catWidth / 2
        this.bulletCatHeight = this.catHeight / 2
        this.vel = 10
        this.draw()
    }
    draw() {
        this.bulletCat = new Image()
        this.bulletCat.src = `./img/fish-bone.png`
        this.bulletCat.onload = () => this.ctx.drawImage(this.bulletCat, this.posX, this.posY, this.bulletCatWidth, this.bulletCatHeight)
        this.move()
    }
    move() {
        this.posY += this.vel
  }
}