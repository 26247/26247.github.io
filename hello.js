var ctx = document.getElementById("helloCanvas").getContext("2d");

ctx.beginPath();
ctx.rect(20, 20, 80, 80);
ctx.fillStyle = "#00FF00";
ctx.fill();
ctx.closePath();
