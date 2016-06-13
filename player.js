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

player.prototype.realPosition = function(axis)
{
    if(axis == "x")
    {
        return Math.cos(this.angle * Math.PI / 180) *
        (this.x - this.usingCamera.x) -
        Math.sin(this.angle * Math.PI / 180) *
        (this.y - this.usingCamera.y)
    }
    if(axis == "y")
    {
        return Math.sin(this.angle * Math.PI / 180) *
        (this.x - this.usingCamera.x) +
        Math.cos(this.angle * Math.PI / 180) *
        (this.y - this.usingCamera.y)
    }
}

player.prototype.draw = function()
{
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillRect(
        this.realPosition("x") + canvas.width / 2 - this.boxSize / 2,
        this.realPosition("y") + canvas.height / 2 - this.boxSize / 2,
        this.boxSize, this.boxSize);

    ctx.font = "18px serif";
    ctx.fillText(this.angle, 10, 20);
};

player.prototype.move = function()
{
    if(clickedMouse == 1)
    {
        this.shot(-Math.sign(mouseX - canvas.width / 2 -
            this.realPosition("x")) *
            Math.cos(Math.atan((mouseY - canvas.height / 2 -
            this.realPosition("y")) /
            (mouseX - canvas.width / 2 -
            this.realPosition("x")))),
            -Math.sign(mouseX - canvas.width / 2 -
            this.realPosition("x")) *
            Math.sin(Math.atan((mouseY - canvas.height / 2 -
            this.realPosition("y")) /
            (mouseX - canvas.width / 2 -
            this.realPosition("x")))));
    }

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

    var tempIndex = -1;
    var tempX = this.x; 
    var tempY = this.y; 
    this.bullets.forEach(function(item, index, array)
    {
        item.draw();

        item.move();

        tempIndex = index;

        if(item.x > tempX + windowSize || item.x < tempX - windowSize ||
            item.y > tempY + windowSize || item.y < tempY - windowSize)
        {
            array.splice(index, 1);
        }
    });

    ctx.fillStyle = "rgb(127, 127, 0)";
    ctx.font = "18px serif";
    ctx.fillText(tempIndex + 1, 10, 40);
};

player.prototype.shot = function(left_right, top_bottom)
{
    this.bullets.push(new bullet(this.x, this.y, left_right, top_bottom,
    this.angle, this.usingCamera));
};
