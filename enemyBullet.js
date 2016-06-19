"use strict";
var enemyBullet = function(xOrigin, yOrigin, left_right, top_bottom,
    myCamera)
{
    this.x = xOrigin;
    this.y = yOrigin;
    this.left_right = left_right;
    this.top_bottom = top_bottom;
    this.boxSize = 5;

    this.usingCamera = myCamera;
};

enemyBullet.prototype.draw = function()
{
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(this.usingCamera.angle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.fillStyle = "rgb(0, 127, 127)";
    ctx.fillRect(
        this.x - (this.usingCamera.x - canvas.width / 2) - this.boxSize / 2,
        this.y - (this.usingCamera.y - canvas.height / 2) - this.boxSize / 2,
        this.boxSize, this.boxSize);

    ctx.restore();
};

enemyBullet.prototype.move = function()
{
    this.x -=
        this.left_right * 10 +
        this.top_bottom * 10;
    this.y -=
        this.top_bottom * 10 -
        this.left_right * 10;
};

enemyBullet.prototype.collition = function(attackingPlayer)
{
    if(this.x - this.boxSize < attackingPlayer.x &&
        this.x + this.boxSize > attackingPlayer.x &&
        this.y - this.boxSize < attackingPlayer.y &&
        this.y + this.boxSize > attackingPlayer.y)
    {
        alert("You Are Dead");
        document.location.reload(true);
    }
};
