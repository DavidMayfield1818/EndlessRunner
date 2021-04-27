class Loading extends Phaser.Scene {
    constructor () {
        super("loadingScene");
    }

    preload() {
        // loading bar here
        //console.log('loading');
        this.load.path = './assets/';
        // load graphics
        this.load.image('ball', 'ball.png');
        this.load.image('Background','Background.png')
        // load audio
    }

    create() {
        // local storage if we need any


        // go to next scene
        this.scene.start('play01Scene');
    }
    // added a line to update doc
}