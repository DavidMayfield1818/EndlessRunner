class Instructions extends Phaser.Scene {
    constructor () {
        super("instructionsScene");
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
        this.add.text(game.config.width/2, game.config.height/2 - 64 - 30, 'Instructions', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '17px';
        menuConfig.backgroundColor = '#000000';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2 - 32, 'Click to kick the ball', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 'The further you click the farther it goes', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 32, 'Kick to your teammates to earn points', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 96, 'You can only kick if your temmate has the ball', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Every kick increases your streak', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 128, 'The streak points are worth more and more', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 160, 'Enemy player are -5 points and reset the streak', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 192, 'Enemy players can still kick', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 224, 'So use them to stay alive if you need to', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 256, 'The blackhole means game over', menuConfig).setOrigin(0.5);
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
}