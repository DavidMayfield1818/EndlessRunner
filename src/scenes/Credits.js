class Credits extends Phaser.Scene {
    constructor () {
        super("creditsScene");
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
        this.add.text(game.config.width/2, game.config.height/2 - 64 - 30, 'Credits', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '17px';
        menuConfig.backgroundColor = '#000000';
        menuConfig.color = '#FFFFFF';
        this.add.text(game.config.width/2, game.config.height/2, 'David Mayfield - Code', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 32, 'Longyu Li - Code', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Kendrick Le - Art', menuConfig).setOrigin(0.5);

        let backButton = this.add.text(game.config.width - 128, game.config.height - 64, 'Menu', menuConfig).setOrigin(0.5);

        backButton.setInteractive();
        backButton.on('pointerdown', () => {
            this.scene.start('menuScene'); 
        });
    }
}