var board = {
    width: 505,
    height: 538,
    tileHeight: 83,
    tileWidth: 101
};
// The player starts at and cannot move past yLimit
board.yLimit = board.height - board.tileHeight - 47;

// Function code from Mozilla Developer Network
// Returns a random number between min (inclusive) and max (exclusive)
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var Enemy = function(startX, startY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = startX;
    this.y = startY;
    this.speed = getRandomArbitrary(50, 300);
    this.width = 101;
    this.yOffset = 78;  // whitespace on the top of enemy in the image
    this.height = 67;   // height of the enemy within the image

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x += this.speed * dt;
        this.checkCollision(player)
        if (this.x > board.width) {
            this.x = -150;
        }
};

// Collision uses axis-aligned bounding box code adapted from MDN
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollision = function(player) {
    if (this.x < player.x + player.width + player.xOffset &&
        this.x + this.width > player.x + player.xOffset &&
        this.y + this.yOffset < player.y + player.yOffset + player.height &&
        this.height + this.y + this.yOffset > player.y + player.yOffset) {
            player.score -= 50;
            player.reset();
    }
}



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = board.tileWidth * 2;
    this.y = board.yLimit;
    this.xOffset = 17;  // whitespace on each side of player in the image
    this.width = 67;    // width of the player within the image
    this.height = 76;   // height of the player within the image
    this.yOffset = 64;  // whitespace on the top of player in the image
    this.score = 0;
    this.sprite = 'images/char-pink-girl.png';
}

Player.prototype.reset = function() {
    // Put player back at the starting position
    this.x = board.tileWidth * 2;
    this.y = board.yLimit;
    // Update the score
    document.getElementById('score').innerHTML = this.score;
};

Player.prototype.update = function() {
    if (this.y <= 0) {
        this.score += 100;
        player.reset();
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Move the player left, right, up, or down based on
// the arrow key the user presses. It also prevents
// the player from moving off the board.
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if (this.x > 0) {
               this.x -= board.tileWidth;
            }
            break;
        case 'right':
            if (this.x < board.width - board.tileWidth) {
                this.x += board.tileWidth;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y -= board.tileHeight;
            }
            break;
        case 'down':
            if (this.y < board.yLimit) {
                this.y += board.tileHeight;
            }
            break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(getRandomArbitrary(-300, -400), 60);
var enemy2 = new Enemy(getRandomArbitrary(-200, -300), 60);
var enemy3 = new Enemy(getRandomArbitrary(-350, -500), 60 + board.tileHeight);
var enemy4 = new Enemy(getRandomArbitrary(-50, -150), 60 + board.tileHeight * 2);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
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