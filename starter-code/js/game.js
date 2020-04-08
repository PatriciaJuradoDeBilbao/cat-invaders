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
    board: undefined,
    cats: [],
    bullets: [],
    catImages: [],
    pointsPowerUp: null,
    scorePoints: undefined,
    extraLive: null,
    changeDirection: false,
    counter: 0,
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
        this.scorePoints = new ScorePoints(this.ctx, this.canvasSize)
        this.playerLives = new PlayerLives(this.ctx, this.canvasSize, 3, './img/lives-pixel-heart-png')
        this.interval = setInterval(() => {
            this.setListener()
            this.clear()
            this.drawAll()
            this.counter++
            if (this.counter % 20 === 0) {
                this.cats[Math.floor(Math.random() * this.cats.length)].shoot()
            }
            if (this.counter % (170 + Math.floor(Math.random() * 35)) === 0 && this.pointsPowerUp === null) {
                this.pointsPowerUp = new Points(this.ctx, this.canvasSize)
            }
            if (this.counter % (160 + Math.floor(Math.random() * 25)) === 0 && this.extraLive === null) {
                this.extraLive = new ExtraLives(this.ctx, this.canvasSize)
                
            }
            this.isCollisionAgainstCats(this.player.bullets, this.cats)
            this.cats.forEach(cat => this.isCollisionAgainstPlayer(cat.bulletCat))
            this.isCollisionGameOver(this.cats)
            if (this.playerLives.num <= 0) {
                this.gameOver()
            }
        }, 60)
    },
    clear() {
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
        this.player.clearBullets()
    },
    drawAll() {
        this.background.draw()
        this.player.draw()
        this.scorePoints.draw()
        this.playerLives.draw()
        this.cats.forEach(cat => this.checkBoundaries(cat))
        this.cats.forEach(cat => {
            cat.draw()
            if (this.changeDirection) {
                this.changeCatDirection(cat)
            } 
            this.move(cat)   
        })
        this.changeDirection = false
        if (this.pointsPowerUp != null) {
            this.pointsPowerUp.draw()
            if (this.pointsPowerUp.posX > this.pointsPowerUp.canvasSize.width) { 
                this.pointsPowerUp = null
            }
        }
        if (this.extraLive != null) {
            this.extraLive.draw()
            if (this.extraLive.posY > this.extraLive.canvasSize.height) {
                this.extraLive = null
            }
        }
    },
    generateCats() {
        this.catImages.push("./img/pushee_donut.png", "./img/cry-cat.png", "./img/pixel-cat-png.png", "./img/pixel-cat-png.png")
        for (let row = 0; row <= this.catImages.length - 1; row++) {
            for (let i = 0; i <= 9; i++) {
                this.cats.push(new Cat(this.ctx, 50 + 85 * i, 100 + 80 * row, 80, 80, this.canvasSize, this.catImages[row]))
            }
        }
    },
    checkBoundaries(cat){
        cat.posX >= cat.canvasSize.width - cat.obsWidth || cat.posX <= 0 ? this.changeDirection = true : null // revisar lado derecho que no llega hasta el final de la pantalla 
    },
    move(cat) {
        cat.posX += cat.vel
    },
    changeCatDirection(cat) {  
        cat.vel *= -1
        cat.posY += 25
    },
    isCollisionAgainstCats(bulletsArr, catArr) {
        bulletsArr.forEach(bullet => {
            catArr.forEach(catEnemy => {
                if (
                    bullet.posX < catEnemy.posX + catEnemy.obsWidth &&
                    bullet.posX + bullet.bulletWidth > catEnemy.posX &&
                    bullet.posY < catEnemy.posY + catEnemy.obsHeight &&
                    bullet.posY + bullet.bulletHeight > catEnemy.posY
                    ) {
                        this.scorePoints.addPoints()
                let catEnemyIndex = catArr.indexOf(catEnemy)
                catArr.splice(catEnemyIndex, 1)
                let bulletIndex = bulletsArr.indexOf(bullet)
                bulletsArr.splice(bulletIndex, 1)
                }
            })
            if (
                this.pointsPowerUp != null &&
                bullet.posX < this.pointsPowerUp.posX + this.pointsPowerUp.width &&
                bullet.posX + bullet.bulletWidth > this.pointsPowerUp.posX &&
                bullet.posY < this.pointsPowerUp.posY + this.pointsPowerUp.height &&
                bullet.posY + bullet.bulletHeight > this.pointsPowerUp.posY
                ) {
                    this.scorePoints.powerUpPoints()
                    let bulletIndex = bulletsArr.indexOf(bullet)
                    bulletsArr.splice(bulletIndex, 1)
                    this.pointsPowerUp = null
                } 
            })
        },
    isCollisionAgainstPlayer(cats) {
        cats.forEach(bullet => {
                if (
                    bullet.posX < this.player.posX + this.player.playerWidth &&
                    bullet.posX + bullet.bulletCatWidth > this.player.posX &&
                    bullet.posY < this.player.posY + this.player.playerHeight &&
                    bullet.posY + bullet.bulletCatHeight > this.player.posY
                ) {
                let bulletIndex = cats.indexOf(bullet)
                cats.splice(bulletIndex, 1)    
                this.playerLives.removeLives() 
            }
        })
        if (
            this.extraLive != null &&
            this.extraLive.posX < this.player.posX + this.player.playerWidth &&
            this.extraLive.posX + this.extraLive.width > this.player.posX &&
            this.extraLive.posY < this.player.posY + this.player.playerHeight &&
            this.extraLive.posY + this.extraLive.height > this.player.posY
        ) {
            this.playerLives.addLives()
        this.extraLive = null
        } 
    },
    isCollisionGameOver(catArr) {
        catArr.forEach(catEnemy => {
            if (
                catEnemy.posX < this.player.posX + this.player.playerWidth &&
                catEnemy.posX + catEnemy.obsWidth > this.player.posX &&
                catEnemy.posY < this.player.posY + this.player.playerHeight &&
                catEnemy.posY + catEnemy.obsHeight > this.player.posY
            ) {
                this.gameOver()
            }
        })
    },
    gameOver(){
        clearInterval(this.interval)
        setTimeout(() => clearInterval(this.interval), 5000)
        
        this.ctx.font = 'bold 100px Courier New'
        this.ctx.fillStyle = 'rgba(253, 227, 0)'
        this.ctx.fillText('GAME OVER', this.canvasSize.width / 2 - 250, this.canvasSize.height / 2 )
    }
}





