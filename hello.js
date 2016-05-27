var canvas = document.getElementById("helloCanvas");
var ctx = canvas.getContext("2d");

var x = 0;
var y = 0;

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
    if(event.key == 'w'){
        pressedUp = 0;
    }
    if(event.key == 's'){
        pressedDown = 0;
    }
}

document.addEventListener("keyup", keyUpEvent, false);

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(20 + x, 20 + y, 20, 20);

    if(pressedLeft == true){
        x -= 2;
    }
    if(pressedRight == true){
        x += 2;
    }
    if(pressedUp == true){
        y -= 2;
    }
    if(pressedDown == true){
        y += 2;
    }
}

setInterval(draw, 10);
