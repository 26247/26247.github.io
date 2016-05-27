var canvas = document.getElementById("helloCanvas");
var ctx = canvas.getContext("2d");

var x = 0;
var y = 0;
var dx = 0;
var dy = 0;

var pressedLeft = 0;
var pressedRight = 0;
var pressedUp = 0;
var pressedDown = 0;

function keyDownEvent(event){
    if(event.key == 'a'){
        pressedLeft = 1;
    }
    if(event.key == 'd'){
        pressedRight = 1;
    }
    if(event.key == 'w'){
        pressedUp = 1;
    }
    if(event.key == 's'){
        pressedDown = 1;
    }
}

document.addEventListener("keydown", keyDownEvent, false);

function keyUpEvent(event){
    if(event.key == 'a'){
        pressedLeft = 0;
    }
    if(event.key == 'd'){
        pressedRight = 0;
    }
    if(event.key == 's'){
        pressedDown = 0;
    }
    if(event.key == 'w'){
        pressedUp = 0;
    }
}

document.addEventListener("keyup", keyUpEvent, false);

function draw(){
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(20 + x, 20 + y, 20, 20);

    dx += pressedRight - pressedLeft;
    dy += pressedDown - pressedUp;

    dx *= 0.9;
    dy *= 0.9;

    x += dx;
    y += dy;
}

setInterval(draw, 20);
