class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, gPlayer) {
        super(scene, x, y, 'player');
        //console.log('made player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.body.setSize(70,140);
        this.xVel = 0;
        this.yVel = 0;
        this.spawned = false;
        this.goodguy = gPlayer;
        // state variables for future
        this.target = true;
        this.hasBall = false;
        this.kicked = false;
    }

    update() {
        this.setVelocityX(this.xVel);
        this.setVelocityY(this.yVel);
        if(this.scene.physics.collide(this,this.scene.ball)&&!this.hasBall) {
            this.caught();
            //console.log('caught');
        }
        if(!this.spawned && this.y>game.config.height * 0.3) {
            this.spawned = true;
            this.scene.spawnPlayer();
        }
        if(!this.goodguy) {
            this.angle += 10;
        }
        this.setGravityY(this.scene.gravity);

        if(this.y>game.config.height+70) {
            this.destroy();
            //console.log('destroyed');
        }
    }

    caught() {
        this.target = false;
        this.hasBall = true;
        this.scene.ball.caught(this.x + 20, this.y + 70)
    }
}