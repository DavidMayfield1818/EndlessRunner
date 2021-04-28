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
        this.add.text(game.config.width/2, game.config.height/2 , 'Press R to start', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#4892B4';
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Use Mouse to click', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#12672F';

        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        // check if the buttons are clicked and move scene
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            
            
            this.scene.start('play01Scene');    
          }
    }
}