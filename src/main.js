// Kendrick le
// Longyu Li
// David Mayfield
// Alien 
// completed on : 05/03/2021
// Use multiple Scene classes (defined by your game's style) (5) - Done - menu play and so on
// Properly transition between Scenes and allow the player to restart w/out having to reload the page (5) - Done - though potential rework to make smoother
// Communicate how to play w/ clear, proofread, in-game instructions (5) - Add to the instruction scene and add link to menu
// Have some form of player input/control appropriate to your game design (5) - Done - mouse input to control kicks
// Include one or more animated characters that use a texture atlas (5) - Done - Characters are done via sprite atlas
// Simulate scrolling with a tileSprite or equivalent means (5) - Done - particles being pulled into black hole
// Implement proper collision detection (via Arcade Physics or your own detection routine) (5) - Done - ball collides w players, and bottom of screne for game over
// Have looping background music (5) - Done - added background music
// Use sound effects for key mechanics, UI, and/or significant events appropriate to your game design (5) - Done - kick sound
// Use randomness to generate challenge, e.g. terrain, pickups, etc. (5) - Done - players spawn at random locale at the top of scene
// Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (5) - Done - score counter at top of screen could look nicer though
// Be theoretically endless (5) - Done - Added a cap to difficulty scale
// Be playable for at least 15 seconds for a new player of low to moderate skill (5) - Done - game starts off easy and gets harder
// Run without significant crashes or errors (5) - Done - no crashes so far need to check upon additional features
// Include in-game credits for all roles, assets, music, etc. (5) - Done - Credit scene implemented

// Creative Tilt (10 points)
// Tech (5)
// Lots of effort went into researching the exact mechanics required for the game.
// One of which is using the timings to manipulate states of objects as they fall "into the balck hole."
// Adding buttons in the menu to manuever around the scenes also required understand of mosue implementation on objects.
// Adding mouse control to the ball took some interesting interactions due to wanting to also lock the player from giving input
//          while the ball is in motion
// Manipulation of particles to be "drawn into the black hole"
// Great work with the music for having no prior expirience - well done Longyu
// Local storage highscore

// Visual (5)
// Kendrick did an amazing job with the art. Both backgrounds and animated characters turned out amazingly.
// The culmination of everything coming together with the black hole getting bigger and bigger, the particles flying in,
//          and the blackhole swallowing everything that goes in, really add to the blackhole space aesthetic

// increasing gravity mechanic stemmed from: phasergames.com/using-gravity-inphaser-3/
// game configs
let config = {
    type: Phaser.AUTO,
    width: 512,     // subject to change
    height: 768,    // subject to change
    fps: {
        min: 5,
        target: 60,
        forceSetTimeOut: true
    },

    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
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

