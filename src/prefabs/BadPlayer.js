class BadPlayer extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'master_atlas' ,'Bad Alien2');
        //console.log('made player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.body.setSize(70,140);
        this.setVelocityY(50 + this.scene.gravIncVal*this.scene.gravIncCount);
        this.spawned = false;
        this.goodguy = false;
        // state variables for future
        this.target = true;
        this.hasBall = false;
        this.kicked = false;
        this.dead = false;
        this.delete = 10;
        this.setDepth(3);
        this.droppoint = scene.sound.add('droppoint', {volume: 0.5})

    }
    update() {
        if(this.scene.physics.overlap(this,this.scene.ball)&&!this.hasBall) {
            this.caught();
            //console.log('caught');
        }
        if(!this.spawned && this.y>game.config.height * 0.3) {
            this.spawned = true;
            this.scene.spawnPlayer();
        }

        if(this.y > this.scene.loseHeight && !this.dead) {
            this.setVelocity(game.config.width/2 - this.x, game.config.height - this.y);
            this.dead = true;
        }

        if(this.y>game.config.height && this.dead) {
            this.angle+=10;
            this.setVelocity(0,0);
            this.scaleX -= 0.1;
            this.scaleY -= 0.1;
            this.delete -= 1;
            //console.log('destroyed');
        }

        if(!this.hasBall) {
            this.play('BadWave',true); 
        }
        else {
            this.play('BadHands',true);
        }

        if(this.delete <= 0) {
            this.destroy();
        }
    }

    caught() {
        this.target = false;
        this.hasBall = true;
        this.scene.ball.caught(this.x + 0, this.y + -70, this.body.velocity.y);
        
        this.scene.streak = 1;
        this.scene.scoreAdditionText.text = '-5';
        this.scene.score -= 5;
        
        this.scene.pointAdd(this.x,this.y);
        this.droppoint.play();
    }
}