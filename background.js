"use strict";
var background = function(myCamera)
{
    this.usingCamera = myCamera;
};

background.prototype.draw = function()
{
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(this.usingCamera.angle * Math.PI / 180);
    ctx.translate(-canvas.width / 2, -canvas.height / 2);

    var originTempX = Math.round(this.usingCamera.x / 200) * 200 +
        Math.round(windowSize / 200) * 200;
    var originTempY = Math.round(this.usingCamera.y / 200) * 200 +
        Math.round(windowSize / 200) * 200;
    var tempX = originTempX - Math.round(windowSize / 200) * 400;
    while(tempX <= originTempX)
    {
        var tempY = originTempY - Math.round(windowSize / 200) * 400;
        while(tempY <= originTempY)
        {
            ctx.fillStyle = "rgb(0, 0, 127)";
            ctx.fillRect(
                tempX - (this.usingCamera.x - canvas.width / 2),
                tempY - (this.usingCamera.y - canvas.height / 2),
                195, 195);
            /*ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.font = "36px serif";
            ctx.fillText(tempX / 200 + "," + -tempY / 200,
                tempX - (this.usingCamera.x - canvas.width / 2),
                tempY - (this.usingCamera.y - canvas.height / 2));*/
            tempY += 200;
        }
        tempX += 200;
    }

    ctx.restore();
};
