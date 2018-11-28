function game() {
    background("#808B96");

    // character movement
    
    // loop through all platforms
    player.isGrounded = false;
    for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (player.collide(platform)) {
            
            // play platform collision sound
            if (player.isJumping) {
                random(platformHitSounds).play();
            }
            
            player.isJumping = false;
            player.changeAnimation("run");
            player.velocity.y = 0;
            player.isGrounded = true;
        }
        
        // wrap around canvas
        if (platform.collider.right() < 0) {
            if (platform.isStartPlatform) {
                platform.remove();
            }
            platform.position.x = width + platform.width/2;
            
            // keep platforms above the bottom of the canvas
            var y = platform.position.y;
            y += random(-platformYChange, platformYChange);
            y = min(y, platformMax);
            platform.position.y = y;
            
        }
    }
    
    if (!player.isGrounded) {
        player.velocity.y += GRAVITY;
    }
    
    
    if (keyDown("space") && !player.isJumping) {
        //play jump sound
        random(jumpSounds).play();
        player.changeAnimation("jump");
        player.velocity.y -= jump_speed;
        player.isJumping = true;
    }

     else if (keyDown('right')){
        player.changeAnimation('run');
        player.position.x += 2;
    } 
    
    else if (keyDown('left')){
        player.changeAnimation('run');
        player.position.x -= 2;
    } 
    
    else {
        // player.changeAnimation('idle');
    }
    

    // bottles hit player
    bottles.overlap(player, function (bottle) {
        //bottle sound
        bottle.position.x = random(width, width *3);
        console.log(player.livesLeft);
        player.livesLeft--;
        if (player.livesLeft ==0){
            died();
        }
        
        //spawn soul
        var x = random(soulXMin, soulXMax);
        var y = random(soulYMin, soulYMax);
        var soul = createSprite(x, y);
        soul.addAnimation('default', soul_animation);
        soul.velocity.x = -soulSpeed;
        souls.add(soul);
    });
    
    //player hits soul
    souls.overlap(player, function(soul){
        soul.remove();
        player.livesLeft++;
        soulSound.play();
        
        /* timed reward */
        /*  set a counter */
        // slowDownCounter = 60;
        /* change whatever the reward does */
        
    });

    /* counter code */
//    if (slowDownCounter > 0) {
//        slowDownCounter--;
//    } else if (slowDownCounter == 0) {
      /* reset the reward */  
//    }
    
    // remove un gathered hearts
    for (var i = 0; i < souls.length; i++) {
        if (souls[i].position.x < -50) {
            souls[i].remove();
        }
    }
    
    // wrap bottles back to the beginning 
    for (var i = 0; i < bottles.length; i++) {
        if (bottles[i].position.x < -50) {
            bottles[i].position.x = random(width, width * 3);
        }
    }
    
    // wrap clouds
    for (var i = 0; i < clouds.length; i++) {
        if (clouds[i].position.x < -100) {
            clouds[i].position.x = random(width, width * 2);
        }
    }
    
    // wrap flames
    for (var i = 0; i < flames.length; i++) {
        if (flames[i].position.x < -100) {
            flames[i].position.x = random(width, width * 2);
        }
    }

    // player falls below the canvas
    if (player.position.y - player.height > height || player.position.x < -player.width) {
        // player dies sound
        died();
    }

//    camera.position.y = player.position.y;
    
    /* tracking progress */
    progress += 1;
    if (progress == progressTotal) {
        console.log('next level');
        progress = 0;
        
        // increase platform distance
        platformYChange += 20;
        
        // speed up platforms
        platformSpeed += 0.2;
        for (var i = 0; i < platforms.length; i++) {
            platforms[i].velocity.x = -platformSpeed;
        }
        
        level +=1;
        if(level == levelCount) {
            // add an bottle
            var x = random(width, width * 3);
            var y = random(bottleYMin, bottleYMax);
            var bottle = createSprite(x, y);
            bottle.setCollider("rectangle", 0, 0, 20, 10);
            bottle.addAnimation("default", bottle_animation);
            bottle.velocity.x = -bottleSpeed - random(0, 1);
            bottles.add(bottle);
            
            level = 0;
        }
    }
    
    drawSprites();
    
    
    /* ui */
    textSize(16);
    textFont("Comic Sans MS");
    fill('red');
    noStroke();
//    text("Lives: " + player.livesLeft, 10, 20);
    for (var i = 0; i < player.livesLeft; i++) {
        ellipse(10 + i * 12, 10, 10);
    }
}