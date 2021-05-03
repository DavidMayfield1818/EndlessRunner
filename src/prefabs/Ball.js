class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'ball');
        //console.log('made ball');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setCircle(17.5);
        this.travelling = true;
        let xVel = 0;
        let yVel = -200;
        this.setVelocity(xVel,yVel);
        this.kickFactor = 1;
        this.setGravityY(200);
        this.sfxkick = scene.sound.add('kick');

    }

    update() {
        this.scene.input.on('pointerdown', function(pointer){
            if(!this.travelling){
                this.sfxkick.play();
                this.body.setAllowGravity(true);
                let xVel = (pointer.x - this.x)*this.kickFactor;
                let yVel = (pointer.y - this.y)*this.kickFactor;
                this.setVelocity(xVel,yVel);

                this.travelling = true;
                //console.log('moving ball');
            }
        }, this);
        this.angle += 5;
    }

    caught(inX, inY, inYVel) {
        // if player successfully passes ball to another alien
        this.body.setAllowGravity(false);
        this.travelling = false;
        this.x = inX;
        this.y = inY;
        this.setVelocity(0,inYVel);
    }
}