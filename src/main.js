// game configs
let config = {
    type: Phaser.CANVAS,
    width: 512,     // subject to change
    height: 768,    // subject to change
    
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [Loading, Menu, Play01, Instructions, Credits]
}

let game = new Phaser.Game(config);

// set UI sizes


// reserve keyboard bindings

