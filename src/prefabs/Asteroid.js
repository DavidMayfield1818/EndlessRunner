class Asteroid extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, randVal) {
        super(scene, x, y, 'asteroids', randVal);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.dead = false;
        this.delete = 10;
        this.setDepth(2);
    }
    update() {
        if(this.y > this.scene.loseHeight && !this.dead) {
            this.setVelocity(game.config.width/2 - this.x, game.config.height - this.y);
            this.dead = true;
        }
        if(this.y > game.config.height && this.dead) {
            this.angle+=10;
            this.setVelocity(0,0);
            this.scaleX -= 0.1;
            this.scaleY -= 0.1;
            this.delete -= 1;
            this.ange += 10;
            //console.log('destroyed');
        }
        if(this.delete <= 0) {
            this.destroy();
        }
    }
}