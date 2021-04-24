class Ball extends Phaser.Physics.Arcade.Sprite {
    constructor (scene,x,y) {
        super(scene, x, y, 'ball');

        scene.add.existing(this);
        scene.physics.add.existsing(this);
        this.setImmovable();
        this.travelling = false;
    }

    update() {
        if(!traveling){
            // update position based on blackhole gravity

            // if mouse clicked
            // then add velocity based on where mouse cursor is

        }else{
            // update position to reflect movement, slow down as to try and stop a bit after initial mouse position
            // check for collisions with other objects-probably done with in play
        }
    }

    freefall() {
        // if player misses shot but ball is still on screen
    }

    caught() {
        // if player successfully passes ball to another alien
    }
}