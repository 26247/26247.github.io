"use strict";
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

canvas.focus();

var camera0 = new camera();

var player0 = new player(camera0);

var background0 = new background(camera0);

var pressedKey = new Array(128).fill(0);

function keyDownEvent(event)
{
    pressedKey[event.key.charCodeAt()] = 1;
}

canvas.addEventListener("keydown", keyDownEvent, false);

function keyUpEvent(event)
{
    pressedKey[event.key.charCodeAt()] = 0;
}

canvas.addEventListener("keyup", keyUpEvent, false);

function unFocused(event)
{
    pressedKey.fill(0);
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
