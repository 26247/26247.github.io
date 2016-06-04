"use strict";
var bullet = function(xOrigin, yOrigin, angleOrigin, myCamera)
{
    this.x = xOrigin;
    this.y = yOrigin;
    this.boxSize = 5;

    this.angle = angleOrigin;

    this.usingCamera = myCamera;
};

bullet.prototype.draw = function()
{
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((this.usingCamera.angle - this.angle) * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    ctx.fillStyle = "rgb(127, 127, 0)";
    ctx.fillRect(
        Math.cos(this.angle * Math.PI / 180) * (this.x - this.usingCamera.x) -
        Math.sin(this.angle * Math.PI / 180) * (this.y - this.usingCamera.y) +
        canvas.width / 2 - this.boxSize / 2,
        Math.cos(this.angle * Math.PI / 180) * (this.y - this.usingCamera.y) +
        Math.sin(this.angle * Math.PI / 180) * (this.x - this.usingCamera.x) +
        canvas.height / 2 - this.boxSize / 2,
        this.boxSize, this.boxSize);

    ctx.restore();
};

bullet.prototype.move = function()
{
    this.x -= Math.sin(this.angle * Math.PI / 180) * 10;
    this.y -= Math.cos(this.angle * Math.PI / 180) * 10;
};
