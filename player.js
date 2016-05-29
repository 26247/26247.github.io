"use strict";
var player = function(myCamera)
{
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.boxSize = 20;
    this.limitingSpeed = 0.9;
    
    this.angle = 0;
    this.deltaAngle = 0;
    this.limitingAngle = 0.9;

    this.usingCamera = myCamera;
};

player.prototype.draw = function()
{
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillRect(
        Math.cos(this.angle * Math.PI / 180) * (this.x - this.usingCamera.x) -
        Math.sin(this.angle * Math.PI / 180) * (this.y - this.usingCamera.y) +
        canvas.width / 2 - this.boxSize / 2,
        Math.cos(this.angle * Math.PI / 180) * (this.y - this.usingCamera.y) +
        Math.sin(this.angle * Math.PI / 180) * (this.x - this.usingCamera.x) +
        canvas.height / 2 - this.boxSize / 2,
        this.boxSize, this.boxSize);

    ctx.font = "18px serif";
    ctx.fillText(this.angle,
        Math.cos(this.angle * Math.PI / 180) * (this.x - this.usingCamera.x) -
        Math.sin(this.angle * Math.PI / 180) * (this.y - this.usingCamera.y) +
        canvas.width / 2 - this.boxSize / 2,
        Math.cos(this.angle * Math.PI / 180) * (this.y - this.usingCamera.y) +
        Math.sin(this.angle * Math.PI / 180) * (this.x - this.usingCamera.x) +
        canvas.height / 2 - this.boxSize / 2);
};

player.prototype.move = function()
{
    this.dx += 
        Math.cos(this.angle * Math.PI / 180) * (pressedRight - pressedLeft) +
        Math.sin(this.angle * Math.PI / 180) * (pressedDown - pressedUp);
    this.dy +=
        Math.cos(this.angle * Math.PI / 180) * (pressedDown - pressedUp) -
        Math.sin(this.angle * Math.PI / 180) * (pressedRight - pressedLeft);
    this.dx *= this.limitingSpeed;
    this.dy *= this.limitingSpeed;
    this.x += this.dx;
    this.y += this.dy;

    this.deltaAngle += (pressedAnglePlus - pressedAngleMinus) / 4;
    this.deltaAngle *= this.limitingAngle;
    this.angle += this.deltaAngle;
};
