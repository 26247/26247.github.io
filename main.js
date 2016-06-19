"use strict";
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var windowSize = Math.sqrt(
    Math.pow(canvas.height, 2) + Math.pow(canvas.width, 2));

canvas.focus();

var camera0 = new camera();

var player0 = new player(camera0);

var background0 = new background(camera0);

var bullets = [];

var enemies = [];

var enemyBullets = [];

var pressedKey = new Array(128).fill(0);

var clickedMouse = 0;
var mouseX = 0;
var mouseY = 0;

function keyDownEvent(event)
{
    pressedKey[event.key.charCodeAt(0)] = 1;
}

canvas.addEventListener("keydown", keyDownEvent, false);

function keyUpEvent(event)
{
    pressedKey[event.key.charCodeAt(0)] = 0;
}

canvas.addEventListener("keyup", keyUpEvent, false);

function unFocused(event)
{
    pressedKey.fill(0);
}

canvas.addEventListener("blur", unFocused, false);

function mouseMoveEvent(event)
{
    mouseX = event.clientX - canvas.offsetLeft;
    mouseY = event.clientY - canvas.offsetTop;
}

canvas.addEventListener("mousemove", mouseMoveEvent, false);

function mouseDownEvent(event)
{
    clickedMouse = 1;
}

canvas.addEventListener("mousedown", mouseDownEvent, false);

function mouseUpEvent(event)
{
    clickedMouse = 0;
}

canvas.addEventListener("mouseup", mouseUpEvent, false);

function mouseOutEvent(event)
{
    clickedMouse = 0;
}

canvas.addEventListener("mouseout", mouseOutEvent, false);

function mouseEnterEvent(event)
{
    if(event.buttons != 0)
    {
        clickedMouse = 1;
    }
}

canvas.addEventListener("mouseenter", mouseEnterEvent, false);

function draw()
{
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    background0.draw();

    player0.draw();

    player0.move();

    enemies.forEach(function(enemyItem, enemyIndex, enemyArray)
    {
        enemyItem.move();

        enemyItem.draw();

        bullets.forEach(function(bulletItem, bulletIndex, bulletArray)
        {
            if(enemyItem.collision(bulletItem) == 1)
            {
                enemyArray.splice(enemyIndex, 1);
            }
        });

        enemyItem.playerCollition(player0);

        enemyItem.shot();
    });

    enemyBullets.forEach(function(item, index, array)
    {
        item.move();

        item.draw();

        item.collition(player0);

        if(item.x > player0.x + windowSize ||
            item.x < player0.x - windowSize ||
            item.y > player.y + windowSize ||
            item.y < player0.y - windowSize)
        {
            array.splice(index, 1);
        }
    });

    camera0.track(player0);
}

setInterval(draw, 20);

function createEnemy()
{
    if(Math.random() < 0.5)
    {
        if(Math.random() < 0.5)
        {
            enemies.push(new enemy(camera0, player0, player0.x - windowSize,
                player0.y + (Math.random() - 0.5) * windowSize));
        }
        else
        {
            enemies.push(new enemy(camera0, player0, player0.x + windowSize,
                player0.y + (Math.random() - 0.5) * windowSize));
        }
    }
    else
    {
        if(Math.random() < 0.5)
        {
            enemies.push(new enemy(camera0, player0,
                player0.x - (Math.random() - 0.5) * windowSize,
                player0.y - windowSize));
        }
        else
        {
            enemies.push(new enemy(camera0, player0,
                player0.x - (Math.random() - 0.5) * windowSize,
                player0.y + windowSize));
        }
    }
}

setInterval(createEnemy, 1000);
