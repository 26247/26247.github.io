var canvas = document.getElementById("helloCanvas");
var ctx = canvas.getContext("2d");

var x = 0;
var y = 0;
var dx = 0;
var dy = 0;
var boxSize = 20;
var limitingSpeed = 0.9;

var cameraX = 0;
var cameraY = 0;
var cameraDeltaX = 0;
var cameraDeltaY = 0;
var cameraSpeed = 0.1;

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
    if(event.key == 's'){
        pressedDown = 1;
    }
    if(event.key == 'w'){
        pressedUp = 1;
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
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillRect(
        canvas.width / 2 - boxSize / 2 + x - cameraX,
        canvas.height / 2 - boxSize / 2 + y - cameraY,
        boxSize, boxSize);
    ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
    for(var tempX = 0; tempX < 1000; tempX += 200){
        for(var tempY = 0; tempY < 1000; tempY += 200){
            ctx.fillRect(tempX - cameraX, tempY - cameraY, 100, 100);
        }
    }

    dx += pressedRight - pressedLeft;
    dy += pressedDown - pressedUp;

    dx *= limitingSpeed;
    dy *= limitingSpeed;

    x += dx;
    y += dy;

    if(x - cameraX > 0){
        cameraDeltaX += (dx - cameraDeltaX) * cameraSpeed;
    }
    if(x - cameraX < 0){
        cameraDeltaX -= (cameraDeltaX - dx) * cameraSpeed;
    }
    if(y - cameraY > 0){
        cameraDeltaY += (dy - cameraDeltaY) * cameraSpeed;
    }
    if(y - cameraY < 0){
        cameraDeltaY -= (cameraDeltaY - dy) * cameraSpeed;
    }

    cameraX += cameraDeltaX;
    cameraY += cameraDeltaY;
}

setInterval(draw, 20);
