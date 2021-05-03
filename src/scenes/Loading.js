class Loading extends Phaser.Scene {
    constructor () {
        super("loadingScene");
    }

    preload() {
        // loading bar here
        let loadBox = this.add.graphics();
        loadBox.fillStyle(0x381f52, 1);
        loadBox.fillRect(32,game.config.height/2 - 16, (game.config.width - 64), 64);
        let loadingBar = this.add.graphics();
        this.make.text({
            x: game.config.width/2,
            y: game.config.height/2-30,
            text: 'Loading...',
            style: {
                font: ' 18px Courier',
                fill: '#ffffff'
            }
        }).setOrigin(0.5);

        var percent = this.make.text({
            x: game.config.width/2,
            y: game.config.height/2+10,
            text: '0%',
            style: {
                font: ' 18px Courier',
                fill: '#ffffff'
            }
        });
        percent.setOrigin(0.5,0);
        
        this.load.on('progress', (value) => {
            percent.setText(parseInt(value * 100) + '%');
            loadingBar.clear();
            loadingBar.fillStyle(0x000000, 1);
            loadingBar.fillRect(64,game.config.height/2, (game.config.width - 128) * value, 32);
        });

        this.load.on('complete', () => {
            percent.destroy();
            loadingBar.destroy();
        })
        //console.log('loading');
        this.load.path = './assets/';
        // load graphics
        this.load.image('star', 'star.png');
        this.load.image('blackhole', 'BlackishHoleishRegionOverThere.png');
        this.load.image('ball', 'ball.png');
        this.load.image('Background', 'Background.png')
        this.load.image('paticles', 'paticles.png')
        this.load.image('planet', 'planet.png')
        this.load.audio('bgm', 'bgm.m4a')
        this.load.audio('kick','kick_sound.wav')
        this.load.spritesheet('asteroids', 'asteroids.png', {frameWidth: 80, frameHeight: 80, startFrame: 0, endFrame: 4});
        this.load.spritesheet('alien', 'AlienBig.png', {frameWidth: 90, frameHeight: 100, startFrame: 0, endFrame: 11});
        // load audio
    }

    create() {
        // go to next scene
        this.scene.start('play01Scene');
    }
    // added a line to update doc
}