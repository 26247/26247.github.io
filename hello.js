var canvas = document.getElementById("helloCanvas");
var ctx = canvas.getContext("2d");

canvas.focus();

var x = 0;
var y = 0;
var dx = 0;
var dy = 0;
var boxSize = 20;
var limitingSpeed = 0.9;
var angle = 0;
var deltaAngle = 0;
var limitingAngle = 0.9;

var cameraX = 0;
var cameraY = 0;
var cameraDeltaX = 0;
var cameraDeltaY = 0;
var cameraSpeed = 0.1;

var pressedLeft = 0;
var pressedRight = 0;
var pressedUp = 0;
var pressedDown = 0;
var pressedAngleMinus = 0;
var pressedAnglePlus = 0;

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
    if(event.key == 'q'){
        pressedAnglePlus = 1;
    }
    if(event.key == 'e'){
        pressedAngleMinus = 1;
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
    if(event.key == 'q'){
        pressedAnglePlus = 0;
    }
    if(event.key == 'e'){
        pressedAngleMinus = 0;
    }
}

canvas.addEventListener("keyup", keyUpEvent, false);

function unFocused(event){
    pressedLeft = 0;
    pressedRight = 0;
    pressedDown = 0;
    pressedUp = 0;
    pressedAngleMinus = 0;
    pressedAnglePlus = 0;
}

canvas.addEventListener("blur", unFocused, false);

function draw(){
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.fillStyle = "rgb(0, 255, 0)";
    ctx.fillRect(
        Math.cos(angle * Math.PI / 180) * (x - cameraX) -
        Math.sin(angle * Math.PI / 180) * (y - cameraY) +
        canvas.width / 2 - boxSize /2,
        Math.cos(angle * Math.PI / 180) * (y -cameraY) +
        Math.sin(angle * Math.PI / 180) * (x - cameraX) +
        canvas.height / 2 - boxSize / 2,
        boxSize, boxSize);
    ctx.font = "18px serif";
    ctx.fillText(angle,
        Math.cos(angle * Math.PI / 180) * (x - cameraX) -
        Math.sin(angle * Math.PI / 180) * (y - cameraY) +
        canvas.width / 2 - boxSize /2,
        Math.cos(angle * Math.PI / 180) * (y -cameraY) +
        Math.sin(angle * Math.PI / 180) * (x - cameraX) +
        canvas.height / 2 - boxSize / 2);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);
    var boxTempX = (x / 200).toFixed() * 200 - 400;
    var boxTempY = (y / 200).toFixed() * 200 - 400;
    for(var tempX = boxTempX; tempX < boxTempX + 1000; tempX += 200){
        for(var tempY = boxTempY; tempY < boxTempY + 1000; tempY += 200){
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
    ctx.restore();

    dx += Math.cos(angle * Math.PI / 180) * (pressedRight - pressedLeft) + 
        Math.sin(angle * Math.PI / 180) * (pressedDown - pressedUp);
    dy += Math.cos(angle * Math.PI / 180) * (pressedDown - pressedUp) -
        Math.sin(angle * Math.PI / 180) * (pressedRight - pressedLeft);

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

    deltaAngle += (pressedAnglePlus - pressedAngleMinus) / 4;

    deltaAngle *= limitingAngle;

    angle += deltaAngle;
}

setInterval(draw, 20);
