var scene = "intro";
var nightmare;

function draw() {
    if (scene == "intro") {
        intro();   
    } else if (scene == "game") {
        game();
    } else if (scene == "restart") {
        restart();
    }
}

function intro() {
    background("black");
    
    fill("white");
    image(nightmare, 150,80, width/2, height/2);
    textAlign(CENTER, CENTER);
    textFont("Comic Sans MS");
    textSize(50);
    
    
    text("My First Game",0,0, width/2, height/2);
    text("Press Enter to Start", width/2, height/2 + 100);
}

function restart() {
    background("red");
    
    fill("black");
    textAlign(CENTER, CENTER);
    textFont("Comic Sans MS");
    textSize(50);
    
    text("You Went to Hell", width/2, height/2);
    text("Enter to Start Over", width/2, height/2 + 100);
}

function died() {
    scene = "restart";
    
    //play death sound
    deathSound.play();
    
    // reset the player
    player.position.x = playerXStart;
    player.position.y = playerYStart;
    player.velocity.y = 0;
    player.livesLeft = 3;
    
    // destroy other sprites
    while (platforms.length > 0) {
        platforms[0].remove();
    }
    
    while (clouds.length > 0) {
        clouds[0].remove();
    }
    
    while (flames.length > 0) {
        flames[0].remove();
    }
    
    while (bottles.length > 0) {
        bottles[0].remove();
    }
}

function keyPressed() {
    // enter key
    if (keyCode == 13) {
        if (scene == "intro" || scene == "restart") {
            build();
            //play sound to start game
            startSound.play();
            scene = "game";
        }
    }
}