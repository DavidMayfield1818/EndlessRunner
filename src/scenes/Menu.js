class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene");
    }

    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '80px',
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
        this.add.text(game.config.width/2, game.config.height/2 - 64 - 30, 'Space', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '26px';
        menuConfig.backgroundColor = '#900C3F';
        menuConfig.color = '#FFFFFF';
        let startButton = this.add.text(game.config.width/2, game.config.height/2 , 'Press R or click here to start', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#4892B4';
        let InstructionText = this.add.text(game.config.width/2, game.config.height/2 + 64, 'Instructions', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#12672F';
        let creditText = this.add.text(game.config.width/2, game.config.height/2 + 128, 'Credits', menuConfig).setOrigin(0.5);

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        

        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('loadingScene'); 
        });
        InstructionText.setInteractive();
        InstructionText.on('pointerdown', () => {
            this.scene.start('instructionsScene'); 
        });
        creditText.setInteractive();
        creditText.on('pointerdown', () => {
            this.scene.start('creditsScene'); 
        });
    }

    update() {
        // check if the buttons are clicked and move scene
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            
            
            this.scene.start('loadingScene');    
        }
        
        
    }
}