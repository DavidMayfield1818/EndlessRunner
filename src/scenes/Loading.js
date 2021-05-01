class Loading extends Phaser.Scene {
    constructor () {
        super("loadingScene");
    }

    preload() {
        // loading bar here
        //console.log('loading');
        this.load.path = './assets/';
        // load graphics
        this.load.image('star', 'star.png');
        this.load.image('blackhole', 'BlackishHoleishRegionOverThere.png');
        this.load.image('ball', 'ball.png');
        this.load.image('Background', 'Background.png')
        this.load.image('paticles', 'paticles.png')
        this.load.spritesheet('player', 'player.png', {frameWidth: 49, frameHeight: 49, startFrame: 0, endFrame: 4});
        // load audio
    }

    create() {
        // local storage if we need any


        // go to next scene
        this.scene.start('play01Scene');
    }
    // added a line to update doc
}