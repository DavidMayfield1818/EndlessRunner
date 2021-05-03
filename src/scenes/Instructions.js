class Instructions extends Phaser.Scene {
    constructor () {
        super("instructionsScene");
    }

    preload() {
        this.load.spritesheet('alien', './assets/AlienBig.png', {frameWidth: 90, frameHeight: 100, startFrame: 0, endFrame: 11});
        this.load.spritesheet('badAlien', './assets/BadAlien.png', {frameWidth: 90, frameHeight: 100, startFrame: 0, endFrame: 11});
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '64px',
            backgroundColor: '#C275CF',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        
        // define keys
        this.add.text(game.config.width/2, 64, 'Instructions', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '16px';
        menuConfig.backgroundColor = '#000000';
        menuConfig.color = '#FFFFFF';
        menuConfig.align = 'left';
        this.add.text(20, 128, 'Click to kick the ball.', menuConfig).setOrigin(0);
        this.add.text(20, 160, 'The further you click the farther it goes.', menuConfig).setOrigin(0);
        this.add.text(20, 192, 'Kick to your teammates to earn points.', menuConfig).setOrigin(0);
        this.add.text(20, 224, 'You can only kick if your teammate has the ball.', menuConfig).setOrigin(0);
        this.add.text(20, 256, 'Every kick increases your streak.', menuConfig).setOrigin(0);
        this.add.text(20, 288, 'The streak points are worth more and more.', menuConfig).setOrigin(0);
        this.add.text(20, 320, 'Enemy player are -5 points and reset the streak.', menuConfig).setOrigin(0);
        this.add.text(20, 352, 'Enemy players can still kick...', menuConfig).setOrigin(0);
        this.add.text(20, 384, 'Use them to stay alive if you need to.', menuConfig).setOrigin(0);
        this.add.text(20, 416, 'The blackhole means game over.', menuConfig).setOrigin(0);

        this.add.text(game.config.width/4, 600, 'Good Guy', menuConfig).setOrigin(0.5);
        this.add.text(3*game.config.width/4, 600, 'Bad Guy', menuConfig).setOrigin(0.5);

        this.goodGuy = this.add.sprite('alien').setOrigin(0.5);
        this.badGuy = this.add.sprite('BadAlien').setOrigin(0.5);
        this.goodGuy.x = game.config.width/4;
        this.goodGuy.y = 500;
        this.badGuy.x = 3*game.config.width/4;
        this.badGuy.y = 500;

        this.anims.create ({
            key: 'wave',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('alien',{start: 0, end: 11})
        });

        this.anims.create ({
            key: 'BadWave',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('badAlien',{start: 0, end: 11})
        });


        menuConfig.backgroundColor = '#4892B4';
        let backButton = this.add.text(game.config.width - 128, game.config.height - 64, '<- Menu', menuConfig).setOrigin(0.5);
        
        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('menuScene'); 
        });

        backButton.on('pointerover', function () {
            backButton.setBackgroundColor('#E3F021');
            backButton.setColor('#000000')
        });

        backButton.on('pointerout', function () {
            backButton.setBackgroundColor('#4892B4');
            backButton.setColor('#FFFFFF')
        });
    }
    update(){
        this.goodGuy.play('wave',true);
        this.badGuy.play('BadWave',true);
    }
}