// Kendrick le
// Longyu Li
// David Mayfield
// Alien Soccer (WIP)
// completed on : ##/##/####
// Use multiple Scene classes (defined by your game's style) (5) - Done - menu play and so on
// Properly transition between Scenes and allow the player to restart w/out having to reload the page (5) - Done - though potential rework to make smoother
// Communicate how to play w/ clear, proofread, in-game instructions (5) - Add to the instruction scene and add link to menu
// Have some form of player input/control appropriate to your game design (5) - Done - mouse input to control kicks
// Include one or more animated characters that use a texture atlas (5) - WIP - art is in the works, need to implement w sprite atlas though
// Simulate scrolling with a tileSprite or equivalent means (5) - WIP - to be done via particles being pulled into black hole
// Implement proper collision detection (via Arcade Physics or your own detection routine) (5) - ball collides w players, and bottom of screne for game over
// Have looping background music (5) - WIP - need to make backgroud music loop
// Use sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5) - WIP - need to record: kick, point score, black hole
// Use randomness to generate challenge, e.g. terrain, pickups, etc. (5) - Done - players spawn at random locale at the top of scene
// Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5) - WIP
// Be theoretically endless (5) - almost - need to add a cap to gravity bumps
// Be playable for at least 15 seconds for a new player of low to moderate skill (5) - done - game starts off easy and gets harder
// Run without significant crashes or errors (5) - Done - no crashes so far need to check upon additional features
// Include in-game credits for all roles, assets, music, etc. (5) - WIP - need to implement the credit scene

// Creative Tilt (10 points)
// Tech (5)
// WIP

// Visual (5)
// WIP

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
    scene: [ Menu, Play01, Loading, Instructions, Credits]
}

let TimeStep = (this,{
    min: 5,
    target: 60,
    forceSetTimeOut: true
});


let game = new Phaser.Game(config);
let keyR, keyESC;
// set UI sizes


// reserve keyboard bindings

