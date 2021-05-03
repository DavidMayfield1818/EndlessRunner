class Player extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, gPlayer) {
        super(scene, x, y, 'alien');
        //console.log('made player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.body.setSize(70,140);
        this.setVelocityY(50 + this.scene.gravIncVal*this.scene.gravIncCount);
        this.spawned = false;
        this.goodguy = gPlayer;
        // state variables for future
        this.target = true;
        this.hasBall = false;
        this.kicked = false;
        this.dead = false;
        this.delete = 10;
        this.setDepth(3);

        if(!this.goodguy) {
            this.tint = 0xFF0000;
        
        }


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
            this.play('wave',true); 
        }
        else {
            this.play('hands',true);
        }

        if(this.delete <= 0) {
            this.destroy();
        }


    }

    caught() {
        this.target = false;
        this.hasBall = true;
        this.scene.ball.caught(this.x + 0, this.y + -70, this.body.velocity.y);
        if(this.goodguy) {
            this.scene.score += this.scene.streak;
            this.scene.scoreAdditionText.text = '+' + this.scene.streak;
            this.scene.streak += 1;
        } else {
            this.scene.streak = 1;
            this.scene.scoreAdditionText.text = '-5';
            this.scene.score -= 5;
        }
        this.scene.scoreText.text = this.scene.score;
        this.scene.scoreAdditionText.x = this.x + 32;
        this.scene.scoreAdditionText.y = this.y;
        this.scene.scoreAdditionText.alpha = 1;
        this.scene.time.addEvent({
            delay: 30,
            repeat: 61,
            callback: () => {
                if(!this.scene.gameOver){
                    this.scene.scoreAdditionText.alpha -= 0.016;
                    this.scene.scoreAdditionText.x += 0.4;
                    this.scene.scoreAdditionText.y -= 0.6;
                }
            }
        });
    }
}