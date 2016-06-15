"use strict";
var enemy = function(myCamera)
{
    this.x = 0;
    this.y = 0;
    this.boxSize = 20;

    this.usingCamera = myCamera;

    this.bullets = [];
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
