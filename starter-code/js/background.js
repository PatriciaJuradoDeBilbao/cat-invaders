class Background {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.width = w;
        this.height = h;
        this.posX = 0;
        this.posY = 0;
        this.background = undefined
    }
    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
      }
}