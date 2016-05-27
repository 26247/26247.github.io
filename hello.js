var canvas = document.getElementById("helloCanvas");
var ctx = canvas.getContext("2d");

canvas.focus();

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

canvas.addEventListener("keydown", keyDownEvent, false);

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

canvas.addEventListener("keyup", keyUpEvent, false);

function unFocused(event){
    pressedLeft = 0;
    pressedRight = 0;
    pressedDown = 0;
    pressedUp = 0;
}

canvas.addEventListener("blur", unFocused, false);

function draw(){
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillRect(
        x - (cameraX - canvas.width / 2) - boxSize / 2,
        y - (cameraY - canvas.height / 2) - boxSize / 2,
        boxSize, boxSize);
    for(var tempX = 0; tempX < 10000; tempX += 200){
        for(var tempY = 0; tempY < 10000; tempY += 200){
            if(tempX - x < canvas.width && x - tempX < canvas.width &&
                tempY - y < canvas.height && y - tempY < canvas.height){
                ctx.fillStyle = "rgba(0, 0, 255, 0.5)"; 
                ctx.fillRect(
                    tempX - (cameraX - canvas.width / 2),
                    tempY - (cameraY - canvas.height / 2),
                    100, 100);
                ctx.fillStyle = "rgba(255, 0, 0, 0.5)"; 
                ctx.font = "36px serif";
                ctx.fillText(tempX / 200 + " " + tempY / 200,
                    tempX - (cameraX - canvas.width / 2),
                    tempY - (cameraY - canvas.height / 2));
            }
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
