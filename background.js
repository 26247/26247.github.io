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

    var originTempX = Math.round(this.usingCamera.x / 200) * 200 + 400;
    var originTempY = Math.round(this.usingCamera.y / 200) * 200 + 400;
    var tempX = originTempX - 1000;
    while(tempX <= originTempX)
    {
        var tempY = originTempY - 1000;
        while(tempY <= originTempY)
        {
            ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
            ctx.fillRect(
                tempX - (this.usingCamera.x - canvas.width / 2),
                tempY - (this.usingCamera.y - canvas.height / 2),
                100, 100);
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.font = "36px serif";
            ctx.fillText(tempX / 200 + "," + -tempY / 200,
                tempX - (this.usingCamera.x - canvas.width / 2),
                tempY - (this.usingCamera.y - canvas.height / 2));
            tempY += 200;
        }
        tempX += 200;
    }

    ctx.restore();
};
