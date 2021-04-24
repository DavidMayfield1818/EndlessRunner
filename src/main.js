// game configs
let config = {
    type: Phaser.CANVAS,
    width: 640,     // subject to change
    height: 960,    // subject to change
    scene: [Loading, Menu, Play01, Instructions, Credits]
}

let game = new Phaser.Game(config);

// set UI sizes


// reserve keyboard bindings

