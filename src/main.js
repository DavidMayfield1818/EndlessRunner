// increasing gravity mechanic stemmed from: phasergames.com/using-gravity-inphaser-3/
// game configs
let config = {
    type: Phaser.CANVAS,
    width: 512,     // subject to change
    height: 768,    // subject to change

    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0}
        }
    },
    scene: [ Menu, Play01,Loading, Instructions, Credits]
}

let game = new Phaser.Game(config);
let keyR, keyESC;
// set UI sizes


// reserve keyboard bindings

