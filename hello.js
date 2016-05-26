var ctx = document.getElementById("helloCanvas").getContext("2d");

var x = 0;
var y = 0;

function draw(){
	ctx.beginPath();
	ctx.rect(20, 20, 20 + x, 20 + y);
	ctx.fillStyle = "#00FF00";
	ctx.fill();
	ctx.closePath();

	x++;
	y++;
}

setInterval(draw, 10);
