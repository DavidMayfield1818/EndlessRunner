class Play01 extends Phaser.Scene {
    constructor () {
        super("play01Scene");
    }

    create() {
        console.log('playing');
        // starting scene parameters
        this.gravity = 0;
        // loads background image
        this.backGround = this.add.tileSprite(0,0,512,760,'Background').setOrigin(0,0);

        this.ball = new Ball(this, game.config.width/2, game.config.height/2);

        // audio

        // particles for black hole


        // set up player group

        // delay before start
        this.time.delayedCall(2500, () => { 
            // allow gravity to start now
            // IDK rn
        });

        // difficulty timer

        // set up mouse input
    }

    update() {
        // check if ball off screen

        // update ball
        this.ball.update();
        // update all players
        // update background
    }

    spawnPlayer() {
        // after some condition spawn a new player
        // might move this location to somewhere else depending

    }

    checkCollision() {
        // check if ball is in a travelling state if so check collsion w players

    }
}