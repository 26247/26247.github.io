"use strict";
var camera = function()
{
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.limitingSpeed = 0.1;

    this.angle = 0;
};

camera.prototype.track = function(trackingObject)
{
    if(trackingObject.x - this.x > 0)
    {
        this.dx += (trackingObject.dx - this.dx) * this.limitingSpeed;
    }
    if(trackingObject.x - this.x < 0)
    {
        this.dx -= -(trackingObject.dx - this.dx) * this.limitingSpeed;
    }
    if(trackingObject.y - this.y > 0)
    {
        this.dy += (trackingObject.dy - this.dy) * this.limitingSpeed;
    }
    if(trackingObject.y - this.y < 0)
    {
        this.dy -= -(trackingObject.dy - this.dy) * this.limitingSpeed;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.angle = trackingObject.angle;
};
