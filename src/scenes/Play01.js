class Play01 extends Phaser.Scene {
    constructor () {
        super("play01Scene");
    }

    create() {
        // starting scene parameters
        this.gravIncVal = 20;
        this.gravIncCount = 0;
        this.score = 0;
        this.streak = 0;
        this.gameOver = false;
        this.loseHeight = game.config.height-16;

        // loads background image
        this.backGround = this.add.tileSprite(0,0,512,768,'Background').setOrigin(0,0);

        this.ball = new Ball(this, game.config.width/2, game.config.height/2);
        this.ball.body.setAllowGravity(true);
        this.ball.setDepth(5);

        this.lastPlayerBad = true;
        // audio

        // particles for black hole
        let spawnLine = new Phaser.Geom.Line(game.config.width * -0.5, 0, game.config.width * 1.5, 0);
        let deathLine = new Phaser.Geom.Line(0, game.config.hieght, game.config.width, game.config.hieght);

        this.particleManager = this.add.particles('star');

        this.dustEmitter = this.particleManager.createEmitter({
            speedY: 200,
            gravityY: 200,
            moveToX: game.config.width/2,
            moveToY: game.config.height,
            lifespan: 2000,
            quantity: 1,
            alpha: {start: 0.8, end: 0.2},
            emitZone: { type: 'random', source: spawnLine, quantity: 100},
            deathZone: { source: deathLine},
            blendMode: 'SCREEN'
        });

        this.particleManager.setDepth(2);

        // blackhole
        this.blackhole = this.add.sprite(game.config.width/2, game.config.height, 'blackhole').setOrigin(0.5, 1);
        this.blackhole.scaleX = 0.5;
        this.blackhole.scaleY = 0.5;
        this.blackhole.setDepth(1);

        // set up player group
        this.playerGroup = this.add.group({
            runChildUpdate: true
        });

        // spawn first player
        this.spawnPlayer(this.game.config.width/2, game.config.height/2 - 200);

        // // delay before start
        // this.time.delayedCall(2500, () => { 
        //     // allow gravity to start now
        //     this.ball.body.setAllowGravity(true);
        //     this.ball.setGravityY(this.gravity);
        // });

        // difficulty timer
        this.difficultyTimer = this.time.addEvent({
            delay: 10000,
            callback: this.gravityIncrease,
            callbackScope: this,
            //loop: true
            repeat: 15
        });

        // set up keyboard input
        keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyR  =this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        
        
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 300
        }
        scoreConfig.fixedWidth = 155;
        this.gameover1 = this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.gameover1.visible = false;
        scoreConfig.fixedWidth = 500;
        scoreConfig.fontSize = '23px';
        this.gameover2 = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ESC for Menu', scoreConfig).setOrigin(0.5);
        this.gameover2.visible = false;
        scoreConfig.fixedWidth = 50;
        this.scoreText = this.add.text(game.config.width/2, 64, this.score, scoreConfig).setOrigin(0.5);
    }

    update() {
        if(!this.gameOver){
            // update ball
            this.ball.update();

            // update background
        }

        // check if ball off screen
        if(this.ball.y > this.loseHeight){
            this.gameover1.visible = true;
            this.gameover2.visible = true;
            this.gameOver = true;
            this.ball.setVelocity(game.config.width/2 - this.ball.x, game.config.height - this.ball.y);
            this.physicsPause = this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.physics.pause();
                    this.ball.setDepth(0);
                }
            });
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.scene.start("menuScene");
        }


    }


    spawnPlayer(inX = Phaser.Math.Between(35, this.game.config.width-35), inY = 0) {
        // after some condition spawn a new player
        if(this.lastPlayerBad) {
            this.spawnGood(inX,inY);
        } else {
            if(Phaser.Math.Between(0, 1)==1) {
                this.spawnGood(inX,inY);
            }else{
                this.spawnBad(inX,inY);
            }
        }
    }

    spawnGood(inX,inY) {
        let player = new Player(this,inX,inY,true,Phaser.Math.Between(0,4));
        player.body.setAllowGravity(false);
        this.playerGroup.add(player);
        this.lastPlayerBad = false;
    }

    spawnBad(inX,inY) {
        let player = new Player(this,inX,inY,false,Phaser.Math.Between(0,4));
        player.body.setAllowGravity(false);
        this.playerGroup.add(player);
        this.lastPlayerBad = true;
        this.ball
    }

    gravityIncrease() {
        // increase gravity
        this.gravIncCount += 1;
        this.ball.setGravityY(this.ball.body.gravity.y+this.gravIncVal);
        //console.log('gravity +');
        //console.log(this.ball.body.gravity.y);
        this.blackhole.scaleX += 0.05;
        this.blackhole.scaleY += 0.05;
        this.loseHeight -= 2;

        this.playerGroup.children.entries.forEach(element => {
            element.setVelocityY(this.gravIncVal+element.body.velocity.y);
        });
        if(!this.ball.travelling){
            this.ball.setVelocityY(this.gravIncVal+this.ball.body.velocity.y);
        }
        // increase black hole graphic size at the bottom
    }
}