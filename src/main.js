// game configs
let config = {
    type: Phaser.CANVAS,
    width: 640,     // subject to change
    height: 480,    // subject to change
    scene: [Menu, Play01, Instructions, Credits]
}

let game = new Phaser.Game(config);

// set UI sizes


// reserve keyboard bindings
let keyF, keyR, keyLeft, keyRight, keyUp, keyDown, keyA, keyD, keyW, keyS;