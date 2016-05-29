"use strict";
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.focus();

var camera0 = new camera();

var player0 = new player(camera0);

var background0 = new background(camera0);

var pressedLeft = 0;
var pressedRight = 0;
var pressedUp = 0;
var pressedDown = 0;
var pressedAngleMinus = 0;
var pressedAnglePlus = 0;

function keyDownEvent(event)
{
    if(event.key == 'a')
    {
        pressedLeft = 1;
    }
    if(event.key == 'd')
    {
        pressedRight = 1;
    }
    if(event.key == 's')
    {
        pressedDown = 1;
    }
    if(event.key == 'w')
    {
        pressedUp = 1;
    }
    if(event.key == 'q')
    {
        pressedAnglePlus = 1;
    }
    if(event.key == 'e')
    {
        pressedAngleMinus = 1;
    }
}

canvas.addEventListener("keydown", keyDownEvent, false);

function keyUpEvent(event)
{
    if(event.key == 'a')
    {
        pressedLeft = 0;
    }
    if(event.key == 'd')
    {
        pressedRight = 0;
    }
    if(event.key == 's')
    {
        pressedDown = 0;
    }
    if(event.key == 'w')
    {
        pressedUp = 0;
    }
    if(event.key == 'q')
    {
        pressedAnglePlus = 0;
    }
    if(event.key == 'e')
    {
        pressedAngleMinus = 0;
    }
}

canvas.addEventListener("keyup", keyUpEvent, false);

function unFocused(event)
{
    pressedLeft = 0;
    pressedRight = 0;
    pressedDown = 0;
    pressedUp = 0;
    pressedAngleMinus = 0;
    pressedAnglePlus = 0;
}

canvas.addEventListener("blur", unFocused, false);

function draw()
{
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player0.draw();

    background0.draw();

    player0.move();

    camera0.track(player0);
}

setInterval(draw, 20);
