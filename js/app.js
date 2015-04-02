// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //enemies position
    this.enemyY = [60, 145, 230];
    this.x = this.startPosX();
    this.y = this.startPosY();
    //random enemies speed
    this.speed = [30, 100, 170, 240, 310, 380, 510];
}

Enemy.prototype.startPosX = function() {
    var startX = -(Math.round(Math.random()*400));
    return startX;
}

Enemy.prototype.startPosY = function() {
    var startY = this.enemyY[Math.round(Math.random() * 2)];
    return startY;
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed[Math.round(Math.random()*6)])*dt;
    //to restart enemies position after fallout
    if(this.x > 500) {
        this.x = this.startPosX();
        this.y = this.startPosY();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
var Player = function() {
    this.plyrImages = [
        'images/char-pink-girl.png',
        'images/char-boy.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png',
        'images/char-princess-girl.png'
    ];
    this.sprite = this.plyrImages[Math.round(Math.random()*4)];
    this.x = 0;
    this.y = 400;
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt){
    this.x * dt;
    this.y * dt;
}

Player.prototype.reset = function() {
    this.x = 0;
    this.y = 400;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(num) {
    switch(num) {
        case 'left':
            if(this.x > 15){ 
                this.x -=100;
            }
            break;
        case 'up':
            if(this.y > -5){
                this.y -=90;
            }
            break;
        case 'right':
            if(this.x < 400){
                this.x +=100;
            }
            break;
        case 'down':
            if(this.y < 375){
                this.y +=90;
            }
            break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
for(var i = 0; i < 7; i++){
    var ne = new Enemy();
    allEnemies.push(ne);
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var lives = 3;
function checkCollisions(enemy, player) {
    document.getElementById('life').innerHTML = "Life: "+lives;
    for(var i in enemy) {
        if((player.x - enemy[i].x < 50 && player.y - enemy[i].y < 50) && (player.x - enemy[i].x > -50 && player.y - enemy[i].y > -50)) {
           resetPositions();
           if(lives > 0){
                lives--;
            }
            else {
                    alert("GAME OVER, YOUR SCORE IS: " + score);
                    lives = 3;
                    score = 0;
            }
        }
    }
}

var score = 0;

function reachEnd () {
    document.getElementById('score').innerHTML = "Score: "+score;
    if(player.y < 0){
        score++;
        player.reset();
    }
}

function resetPositions() {
    player.reset();
    for(var i in allEnemies) {
        allEnemies[i].x = allEnemies[i].startPosX();
        allEnemies[i].y = allEnemies[i].startPosY();
    }
}