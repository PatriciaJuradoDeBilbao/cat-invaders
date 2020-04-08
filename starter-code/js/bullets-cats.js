class BulletsCat {
    constructor(ctx, catPosX, catPosY, catWidth, catHeight) {
        this.ctx = ctx
        this.posX = catPosX + catWidth / 2  
        this.posY = catPosY + catHeight / 2
        this.bulletCatWidth = 15
        this.bulletCatHeight = 25
        this.vel = 15
        this.bulletCat = new Image()
        this.bulletCat.src = `./img/fishbone.png`
    }
    draw() {
        this.ctx.drawImage(this.bulletCat, this.posX, this.posY, this.bulletCatWidth, this.bulletCatHeight)
        this.move()
        console.log(this.bulletCatWidth, this.bulletCatHeight)
    }
    move() {
        this.posY += this.vel
    }
}