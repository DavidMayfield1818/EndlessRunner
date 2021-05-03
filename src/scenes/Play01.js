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
        this.backGround = this.add.tileSprite(0,0,512,768,'master_atlas','Background').setOrigin(0,0);
        this.Planet =  this.add.image(game.config.width/2 + 150, game.config.height/2 - 20, 'master_atlas', 'planet');
        
        // set up ball
        this.ball = new Ball(this, game.config.width/2, game.config.height/2);
        this.ball.body.setAllowGravity(true);
        this.ball.setDepth(5);

        this.lastPlayerBad = true;
        this.lastSpawnX = -100;

        const particles = this.add.particles('master_atlas','paticles');

        this.exhaustEmitter = particles.createEmitter({
            
            quantity: 1,
            speedY: { min:20, max: 50},
            speedX: { min:20, max: 50},
            accelerationY: 1,
            
            //Lifespan: { min:100, max: 300},
            //blendMode: 'ADD',
            frequncey: 50,
            scale: { start: 0.1, end: 0.1},
            alpha:{ start: 0.6, end: 0,},
            rotate:{min:-180, max: 180},
            angle:{min:30, max: 110},
            follow: this.ball,
            
            
        })

        // audio
        this.bgm = this.sound.add('bgm', {volume: 0.1})
        this.bgm.play();

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
        this.blackhole = this.add.sprite(game.config.width/2, game.config.height, 'master_atlas', 'BlackishHoleishRegionOverThere').setOrigin(0.5, 1);
        this.blackhole.scaleX = 0.5;
        this.blackhole.scaleY = 0.5;
        this.blackhole.setDepth(1);

        // set up player group
        this.playerGroup = this.add.group({
            runChildUpdate: true
        });

        // set up asteroid group
        this.asteroidGroup = this.add.group({
            runChildUpdate: true
        });

        // animations for the alien and bad alien

        this.anims.create ({
            key: 'wave',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('master_atlas',{prefix: 'Alien', start: 1, end: 12, suffix: ''})

        });

        this.anims.create ({
            key: 'BadWave',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNames('master_atlas',{prefix: 'Bad Alien', start: 1, end: 12, suffix: ''})

        });

        this.anims.create ({
            key: 'hands',
            repeat: -1,
            frameRate: 0,
            frames: this.anims.generateFrameNames('master_atlas',{prefix: 'Alien', start:6, end:6, suffix: ''})

        });

        this.anims.create ({
            key: 'BadHands',
            repeat: -1,
            frameRate: 0,
            frames: this.anims.generateFrameNames('master_atlas',{prefix: 'Bad Alien', start:6, end:6, suffix: ''})

        });
    
        // spawn first player
        this.spawnPlayer(this.game.config.width/2, game.config.height/2 - 200);

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
        
        
        // text display
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
        this.gameover1.setDepth(5);
        scoreConfig.fixedWidth = 500;
        scoreConfig.fontSize = '23px';
        this.gameover2 = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ESC for Menu', scoreConfig).setOrigin(0.5);
        this.gameover2.visible = false;
        this.gameover2.setDepth(5);

        scoreConfig.align = 'center';
        scoreConfig.fixedWidth = 50;
        this.scoreText = this.add.text(game.config.width/2, 64, this.score, scoreConfig).setOrigin(0.5);
        this.scoreText.setDepth(5);
        scoreConfig.fixedWidth = 60;
        this.backButton = this.add.text(game.config.width - 128, game.config.height - 64, 'Menu', scoreConfig).setOrigin(0.5);
        this.backButton.visible = false;
        this.backButton.setDepth(5);
        let scoreAddConfig = {
            fontFamily: 'Courier',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 50
        }
        this.scoreAdditionText = this.add.text(-100, -100, this.score, scoreAddConfig).setOrigin(0.5);
        this.scoreAdditionText.visible = true;
        this.scoreAdditionText.setDepth(15);
    }

    update() {
        //planet rotate
        this.Planet.rotation += 0.001;

        if(!this.gameOver){
            // update ball
            this.ball.update();

            // show particles for trail
            if(this.ball.travelling == false){
                this.exhaustEmitter.visible = false;
            }else{
                this.exhaustEmitter.visible = true;
            }

            // check if ball off screen
            if(this.ball.y > this.loseHeight){
                this.gameover1.visible = true;
                this.gameover2.visible = true;
                this.gameover2.setInteractive();
                this.gameover2.on('pointerdown', () => {
                    this.bgm.stop();
                    this.scene.restart(); 
                });
                this.backButton.visible = true;
                this.backButton.setInteractive();
                this.backButton.on('pointerdown', () => {
                    this.bgm.stop();
                    this.scene.start('menuScene'); 
                });
                this.gameOver = true;
                this.ball.setVelocity(game.config.width/2 - this.ball.x, game.config.height - this.ball.y);
                this.physicsPause = this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.physics.pause();
                        this.ball.setDepth(0);
                    }
                });

                if(this.score > localStorage.getItem('highscore')){
                    localStorage.setItem('highscore',this.score);
                    this.make.text({
                        x: game.config.width/2,
                        y: game.config.height/2 - 80,
                        text: 'NEW HIGHSCORE!',
                        style: {
                            font: '32px Courier',
                            fill: '#ffffff',
                            backgroundColor: 'black'
                        }
                    }).setOrigin(0.5);
                }
            }
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.bgm.stop();
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.bgm.stop();
            this.scene.start("menuScene");
        }
    }


    spawnPlayer(inX = Phaser.Math.Between(35, this.game.config.width-35), inY = 0) {
        // after some condition spawn a new player
        while(inX > this.lastSpawnX-35 && inX < this.lastSpawnX+35) {
            inX = Phaser.Math.Between(35, this.game.config.width-35);
        }

        this.lastSpawnX = inX;
        let spaceRock = new Asteroid(this,inX,inY+60,Phaser.Math.Between(0,4));
        spaceRock.setVelocityY(50 + this.gravIncVal*this.gravIncCount);
        this.asteroidGroup.add(spaceRock);

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
        let player = new Player(this,inX,inY,true);
        player.body.setAllowGravity(false);
        this.playerGroup.add(player);
        this.lastPlayerBad = false;
    }

    spawnBad(inX,inY) {
        let player = new BadPlayer(this,inX,inY,false);
        player.body.setAllowGravity(false);
        this.playerGroup.add(player);
        this.lastPlayerBad = true;
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
        this.asteroidGroup.children.entries.forEach(element => {
            element.setVelocityY(this.gravIncVal+element.body.velocity.y);
        });
        
        if(!this.ball.travelling){
            this.ball.setVelocityY(this.gravIncVal+this.ball.body.velocity.y);
        }
        // increase black hole graphic size at the bottom
    }

    pointAdd(inX,inY) {
        this.scoreText.text = this.score;
        this.scoreAdditionText.x = inX + 32;
        this.scoreAdditionText.y = inY;
        this.scoreAdditionText.alpha = 1;

        this.time.addEvent({
            delay: 30,
            repeat: 61,
            callback: () => {
                if(!this.gameOver){
                    this.scoreAdditionText.alpha -= 0.016;
                    this.scoreAdditionText.x += 0.4;
                    this.scoreAdditionText.y -= 0.6;
                }
            }
        });
    }
}