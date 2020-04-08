class Bullets {
  constructor(ctx, playerPosX, playerPosY, playerPosY0, playerWidth, playerHeight) {
    this.ctx = ctx
    this.posX = playerPosX + playerHeight - 65  
    this.posY = playerPosY + playerWidth - 50
    this.playerPosY0 = playerPosY0
    this.playerHeight = playerHeight
    this.playerWidth = playerWidth
    this.bulletWidth = this.playerWidth / 2
    this.bulletHeight = this.playerHeight / 2
    this.vel = 100
    this.bullets = new Image()
    this.bullets.src = `./img/waterdrop.png`
    }
  draw() {
    this.ctx.drawImage(this.bullets, this.posX, this.posY, this.bulletWidth, this.bulletHeight)
    this.move()
  }
  move() {
    this.posY -= this.vel
  }
}