const game = {
    name: 'Cat Invaders',
    author: 'Patricia Jurado De Bilbao',
    version: '1.0.0',
    description: 'Juego estilo space invaders pero con gatos',
    license: undefined,
    canvasDom: undefined,
    ctx: undefined,
    canvasSize: {
        height: window.innerHeight,
        width: window.innerWidth / 2
    },
    FPS: 3,
    background: undefined,
    player: undefined,
    cats: [],
    bullets: [],
    bulletCat: [],
    catImages: [],
    changeDirection: false,
    shootCounter: 0,
    score: 0,
    keys: {
        LEFT: 39,
        RIGHT: 37,
        SPACE: 32
    },
    init() {
        this.canvasDom = document.getElementById("catInvadersCanvas")
        this.ctx = this.canvasDom.getContext("2d")
        this.setDimensions()
        this.reset()
        this.start()
    },
    setDimensions() {
        this.canvasDom.width = this.canvasSize.width
        this.canvasDom.height = this.canvasSize.height
    },
    setListener() {
        document.onkeydown = (e => {
            e.keyCode === this.keys.RIGHT ? this.player.move('right') : null
            e.keyCode === this.keys.LEFT ? this.player.move('left') : null
            e.keyCode === this.keys.SPACE ? this.player.shoot('space')  : null                                                                                                  
        })
    },
    reset() {
        this.background = new Background(this.ctx, this.canvasSize.width, this.canvasSize.height)
        this.player = new Player(this.ctx, (this.canvasSize.width / 2) - 25, this.canvasSize.height - 80, 50, 50, this.canvasSize.width, this.canvasSize.height)
        this.generateCats()
    },
    start() {
        this.background = new Background(this.ctx, this.canvasSize.width, this.canvasSize.height)
        this.player = new Player(this.ctx, (this.canvasSize.width / 2) - 25, this.canvasSize.height - 80, 50, 50, this.canvasSize.width, this.canvasSize.height, this.keys)
        this.interval = setInterval(() => {
            this.setListener()
            this.clear()
            this.drawAll()
            this.shootCounter++
            if (this.shootCounter % 15 === 0) {
                this.cats[Math.floor(Math.random() * this.cats.length)].shoot()
            }
            this.isCollision(this.player.bullets, this.cats)
        }, 60)
    },
    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
        this.player.clearBullets()
    },
    drawAll() {
        this.background.draw()
        this.player.draw()
        this.drawScore()
        this.drawLives()
        this.cats.forEach(cat => this.checkBoundaries(cat))
        this.cats.forEach(cat => {
            cat.draw()
            if (this.changeDirection) {
                cat.vel *= -1
                cat.posY += 85 
            } 
            this.move(cat)   
        })
        this.changeDirection = false
    },
    drawScore() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '30px Courier New'
        this.ctx.fillText(`SCORE: < ${this.score} >`, 50, 60)
    },
    scorePoints() {
        this.score += 50
    },
    drawLives() {
        this.ctx.fillStyle = 'white'
        this.ctx.font = '30px Courier New'
        this.ctx.fillText(`LIVES:` , this.canvasSize.width - 250, 60)
        this.lives = new Image()
        this.lives = `./img/water-gun.png`
        this.lives.onload = () => this.ctx.drawImage(this.lives, this.canvasSize.width - 135, 25, 40, 40)
    },
    generateCats() {
        this.catImages.push("./img/pushee_donut.png", "./img/cry-cat.png", "./img/pixel-cat-png.png")
        for (let row = 0; row <= this.catImages.length - 1; row++) {
            for (let i = 0; i <= 7; i++) {
                this.cats.push(new Cat(this.ctx, 50 + 85 * i, 100 + 80 * row, 80, 80, this.canvasSize, this.catImages[row]))
            }
        }
    },
    checkBoundaries(cat){
        cat.posX >= cat.canvasSize.width - cat.obsWidth || cat.posX <= 0 ? this.changeDirection = true : null
    },
    move(cat) {
        cat.posX += cat.vel
    },
    // changeCatDirection(cat) {  // lo meti dentro del forEach o lo dejo asi y lo llamo en el forEach?
    //     cat.vel *= -1
    //     cat.posY += 85 
    // },
    gameOver(){
        clearInterval(this.interval)
    },
    isCollision(bulletsArr, catArr) {
        bulletsArr.forEach(bullet =>
          catArr.forEach(catEnemy => {
            if (
                bullet.posX < catEnemy.posX + catEnemy.obsWidth &&
                bullet.posX + bullet.bulletWidth > catEnemy.posX &&
                bullet.posY < catEnemy.posY + catEnemy.obsHeight &&
                bullet.posY + bullet.bulletHeight > catEnemy.posY
            ) {
            this.scorePoints()
            let catEnemyIndex = catArr.indexOf(catEnemy);
            catArr.splice(catEnemyIndex, 1);
            let bulletIndex = bulletsArr.indexOf(bullet);
            bulletsArr.splice(bulletIndex, 1);
            }
        })
    )}
}





