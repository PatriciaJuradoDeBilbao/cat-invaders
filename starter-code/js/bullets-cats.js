class BulletsCat {
    constructor(ctx, playerPosX, playerPosY, playerPosY0, playerWidth, playerHeight) {
        this.ctx = ctx
        this.posX = playerPosX + playerHeight - 65  
        this.posY = playerPosY + playerWidth - 50
        this.playerPosY0 = playerPosY0
        this.playerHeight = playerHeight
        this.playerWidth = playerWidth
        this.bulletCatWidth = this.playerWidth / 2
        this.bulletCatHeight = this.playerHeight / 2
        this.vel = 100
        this.bulletCat = []
        this.draw()
    }
  draw() {
    this.bulletCat = new Image()
    this.bulletCat.src = `./img/fish-bone.png`
    this.bulletCat.onload = () => this.ctx.drawImage(this.bulletCat, this.posX, this.posY, this.bulletWidth, this.bulletHeight)
    this.move()
  }
  move() {
    this.posY += this.vel
  }
}