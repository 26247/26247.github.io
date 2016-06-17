"use strict";
var enemy = function(myCamera, myPlayer, firstX, firstY)
{
    this.x = firstX;
    this.y = firstY;
    this.boxSize = 20;

    this.usingCamera = myCamera;
    this.trackingPlayer = myPlayer;
};

enemy.prototype.draw = function()
{
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(this.usingCamera.angle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(
        this.x - (this.usingCamera.x - canvas.width / 2) - this.boxSize / 2,
        this.y - (this.usingCamera.y - canvas.height / 2) - this.boxSize / 2,
        this.boxSize, this.boxSize);

    ctx.restore();
};

enemy.prototype.move = function()
{
    if(this.x - this.trackingPlayer.x > 0)
    {
        this.x -= (this.x - this.trackingPlayer.x) / 200;
    }
    if(this.x - this.trackingPlayer.x < 0)
    {
        this.x += -(this.x - this.trackingPlayer.x) / 200;
    }
    if(this.y - this.trackingPlayer.y > 0)
    {
        this.y -= (this.y - this.trackingPlayer.y) / 200;
    }
    if(this.y - this.trackingPlayer.y < 0)
    {
        this.y += -(this.y - this.trackingPlayer.y) / 200;
    }
};

enemy.prototype.collision = function(attackingBullet)
{
    if(this.x - this.boxSize / 2 < attackingBullet.x &&
        this.x + this.boxSize / 2 > attackingBullet.x &&
        this.y - this.boxSize / 2 < attackingBullet.y &&
        this.y + this.boxSize / 2 > attackingBullet.y)
    {
        return 1;
    }else{
        return 0;
    }
};

enemy.prototype.playerColltion = function(attackingPlayer)
{
    if(this.x - this.boxSize < attackingPlayer.x &&
        this.x + this.boxSize > attackingPlayer.x &&
        this.y - this.boxSize < attackingPlayer.y &&
        this.y + this.boxSize > attackingPlayer.y)
    {
        alert("You are dead");
        document.location.reload(true);
    }
};
