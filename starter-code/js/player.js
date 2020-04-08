class Player {
    constructor(ctx, posX, posY, playerWidth, playerHeight, canvasSize, keys) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.playerWidth = playerWidth
        this.playerHeight = playerHeight
        this.player = undefined
        this.vel = 10
        this.posY0 = this.posY
        this.keys = keys
        this.bullets = []
        this.canvasSize = {
            width: canvasSize.width, 
            height: canvasSize.height
        }
        this.player = new Image();
        this.player.src = `./img/water-gun.png`
    }
    draw() {
        this.ctx.drawImage(this.player, this.posX, this.posY, this.playerWidth, this.playerHeight)
        this.clearBullets()
        this.bullets.forEach(bullet => bullet.draw())
        this.move()
    }
    move(dir) {
        if (this.posX <= 20) {
            this.posX = 20
        }
        if (this.posX >= 880) {
            this.posX = 880
        }
        dir === 'left' ? this.posX += this.vel : null
        dir === 'right' ? this.posX -= this.vel : null
    }
    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.playerWidth, this.playerHeight))
    }
    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.posX >= 120)
      }
}