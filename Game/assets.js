// player animations
var idle_sheet, idle_animation;
var run_sheet, run_animation;
var jump_sheet, jump_animation;

// platform
var platforms;
var start_platform_img, platform_img;

// scenery
var clouds, cloud_sheet, cloud_animation;
var flames, flame_img;

// obstacles
var bottles; // group
var bottle_sheet, bottle_animation;

//rewards
var souls; // group
var soul_sheet, soul_animation;

// sounds
var deathSound, startSound;
var soulSound;

// platform
var platformHits = [
    "sfx/platform-hits/hit-0.wav",
    "sfx/platform-hits/hit-2.wav"
]; // array 
var platformHitSounds = []; // empty 

// jump
var jumps = [
    "sfx/jumps/jump-0.wav",
    "sfx/jumps/jump-1.wav",
    "sfx/jumps/jump-2.wav",
    "sfx/jumps/jump-3.wav",
]; // array 
var jumpSounds = []; // empty

// bg music
var bgMusic;
var bgGame;

function preload() {
    idle_sheet = loadSpriteSheet("sprites/main_character/freddy_idle2.png", 128, 128, 16);
    idle_animation = loadAnimation(idle_sheet);

    run_sheet = loadSpriteSheet("sprites/main_character/freddy_running2.png", 128, 128, 6);
    run_animation = loadAnimation(run_sheet);

    jump_sheet = loadSpriteSheet("sprites/main_character/freddy_jumping3.png", 48, 108, 6);
    jump_animation = loadAnimation(jump_sheet);

    platform_img = loadImage("sprites/scenery/platform.png");
    start_platform_img = loadImage("sprites/scenery/start_platform.png");

    cloud_sheet = loadSpriteSheet("sprites/scenery/cloud2.png", 64, 64, 12);
    cloud_animation = loadAnimation(cloud_sheet);

    flame_img = loadImage("sprites/scenery/fire.png");

    bottle_sheet = loadSpriteSheet("sprites/obstacles/bottle.png", 120, 120, 3);
    bottle_animation = loadAnimation(bottle_sheet);
    
    nightmare = loadImage("nightmare.jpg");
    
    soul_sheet = loadSpriteSheet("sprites/rewards/soul.png", 32, 32, 1);
    soul_animation = loadAnimation(soul_sheet);
    
    // load sounds 
    deathSound = loadSound("sfx/death.wav");
    startSound = loadSound("sfx/start.wav");
    soulSound = loadSound("sfx/soul.wav");
    
    // platform hits 
    for (var i = 0; i < platformHits.length; i++) {
        var s = loadSound(platformHits[i]);
        platformHitSounds.push(s);
    }
    
    // jump sounds 
    for (var i = 0; i < jumps.length; i++) {
        var s = loadSound(jumps[i]);
        jumpSounds.push(s);
    }
    
}