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

    this.bullets = [];
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
        Math.cos(this.angle * Math.PI / 180) *
	(pressedKey['d'.charCodeAt(0)] - pressedKey['a'.charCodeAt(0)]) +
        Math.sin(this.angle * Math.PI / 180) *
	(pressedKey['s'.charCodeAt(0)] - pressedKey['w'.charCodeAt(0)]);
    this.dy +=
        Math.cos(this.angle * Math.PI / 180) *
	(pressedKey['s'.charCodeAt(0)] - pressedKey['w'.charCodeAt(0)]) -
        Math.sin(this.angle * Math.PI / 180) *
	(pressedKey['d'.charCodeAt(0)] - pressedKey['a'.charCodeAt(0)]);
    this.dx *= this.limitingSpeed;
    this.dy *= this.limitingSpeed;
    this.x += this.dx;
    this.y += this.dy;

    this.deltaAngle += (pressedKey['q'.charCodeAt(0)] -
    pressedKey['e'.charCodeAt(0)]) / 4;
    this.deltaAngle *= this.limitingAngle;
    this.angle += this.deltaAngle;

    if(pressedKey['j'.charCodeAt(0)])
    {
        this.shot();
    }

    this.bullets.forEach(function(item, index, array)
    {
        item.draw();

        item.move();
    });
};

player.prototype.shot = function()
{
    this.bullets.push(new bullet(this.x, this.y, this.angle, this.usingCamera));
};
