class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene");
    }

    preload() {
        this.load.image('menu','./assets/MenuBackground.png')
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
        
        //loads image
        this.menu = this.add.tileSprite(0,0,512,768,'menu').setOrigin(0,0);
        
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

        startButton.on('pointerover', function () {
            startButton.setBackgroundColor('#E3F021');
            startButton.setColor('#000000')
        });

        startButton.on('pointerout', function () {
            startButton.setBackgroundColor('#900C3F');
            startButton.setColor('#FFFFFF')
        });

        InstructionText.setInteractive();
        InstructionText.on('pointerdown', () => {
            this.scene.start('instructionsScene'); 
        });

        InstructionText.on('pointerover', function () {

            InstructionText.setBackgroundColor('#E3F021');
            InstructionText.setColor('#000000')
        });

        InstructionText.on('pointerout', function () {

            InstructionText.setBackgroundColor('#4892B4');
            InstructionText.setColor('#FFFFFF')
        });

        creditText.setInteractive();
        creditText.on('pointerdown', () => {
            this.scene.start('creditsScene'); 
        });

        creditText.on('pointerover', function () {

            creditText.setBackgroundColor('#E3F021');
            creditText.setColor('#000000')
        });

        creditText.on('pointerout', function () {

            creditText.setBackgroundColor('#12672F');
            creditText.setColor('#FFFFFF')
        });
    }

    update() {
        // check if the buttons are clicked and move scene

        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start('loadingScene');    
        }
        
        
    }
}