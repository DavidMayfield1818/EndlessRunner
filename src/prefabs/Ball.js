class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'ball');
        //console.log('made ball');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setCircle(17.5);
        this.travelling = true;
        this.xVel = 0;
        this.yVel = -200;
    }

    update() {
        this.scene.input.on('pointerdown', function(pointer){
            if(!this.travelling){
                this.xVel = (pointer.x - this.x)*1.5;
                this.yVel = (pointer.y - this.y)*1.5;
                this.travelling = true;
                //console.log('moving ball');
            }
        }, this);
        this.setVelocityX(this.xVel);
        this.setVelocityY(this.yVel);
        this.xVel *= 0.98;
        this.yVel *= 0.98;
        if(this.xVel < 4 && this.xVel > -4) {
            this.xVel = 0;
        }
        if(this.yVel < 4 && this.yVel > -4) {
            this.yVel = 0;
        }
        this.angle += 5;
    }

    caught(inX, inY) {
        // if player successfully passes ball to another alien
        this.body.setAllowGravity(true);
        this.travelling = false;
        this.x = inX;
        this.y = inY;
        this.xVel = 0;
        this.yVel = 0;
    }
}