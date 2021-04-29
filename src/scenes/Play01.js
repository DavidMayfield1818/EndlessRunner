class Play01 extends Phaser.Scene {
    constructor () {
        super("play01Scene");
    }

    preload(){
        this.load.image('Background', './assets/Background.png');
        this.load.image('ball', './assets/ball.png');
        this.gameOver = false;
    }

    create() {
        // console.log('playing');
        // starting scene parameters
        this.gravity = 100;
        this.physics.world.setFPS(60);
        // loads background image
        this.backGround = this.add.tileSprite(0,0,512,768,'Background').setOrigin(0,0);

        this.ball = new Ball(this, game.config.width/2, game.config.height/2);
        this.lastPlayerBad = true;
        // audio

        // particles for black hole


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
            loop: true
        });
        // set up mouse input
        
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
        
        
    }

    update() {
        // check if ball off screen

        // update ball
        this.ball.update();

        // update background


        

        if(this.ball.y > game.config.height){
            this.physics.pause();
            this.gameover1.visible = true;
            this.gameover2.visible = true;
            this.gameOver = true;
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
        // might move this location to somewhere else depending
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
        this.playerGroup.add(player);
        this.lastPlayerBad = false;
    }

    spawnBad(inX,inY) {
        let player = new Player(this,inX,inY,false);
        this.playerGroup.add(player);
        this.lastPlayerBad = true;
    }

    gravityIncrease() {
        // increase gravity
        this.gravity += 25;
        console.log('gravity +');
        // increase black hole graphic size at the bottom
    }
}