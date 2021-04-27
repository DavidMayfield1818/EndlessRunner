class Play01 extends Phaser.Scene {
    constructor () {
        super("play01Scene");
    }

    create() {
        // console.log('playing');
        // starting scene parameters
        this.gravity = 4000;
        // loads background image
        this.backGround = this.add.tileSprite(0,0,512,768,'Background').setOrigin(0,0);

        this.ball = new Ball(this, game.config.width/2, game.config.height/2);
        this.ball.body.setAllowGravity(true);
        this.ball.setGravityY(this.gravity);
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
    }

    update() {
        // check if ball off screen

        // update ball
        this.ball.update();

        // update background
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
        player.body.setAllowGravity(true);
        player.setGravityY(this.gravity);
        this.playerGroup.add(player);
        this.lastPlayerBad = false;
    }

    spawnBad(inX,inY) {
        let player = new Player(this,inX,inY,false);
        player.body.setAllowGravity(true);
        player.setGravityY(this.gravity);
        this.playerGroup.add(player);
        this.lastPlayerBad = true;
    }

    gravityIncrease() {
        // increase gravity
        this.gravity += 2000;
        this.ball.setGravityY(this.gravity);
        console.log('gravity +');
        // increase black hole graphic size at the bottom
    }
}