"use strict";

//Select the myCanvas element
const c = document.getElementById("myCanvas");
// getContext returns a drawing to the canvas
const ctx = c.getContext("2d");
// beginpath is called before the beginning of each line
ctx.beginPath();
// Adds a circle to the canvas (x, y, radius, startAngle, endAngle, [, anticlockwise])
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
// strokes or outlines the current or given path with the current stroke style
ctx.stroke();

// Trying another circle
ctx.beginPath();
// Adds a circle to the canvas (x, y, radius, startAngle, endAngle, [, anticlockwise])
ctx.arc(200, 125, 100, 0, 2 * Math.PI);
// strokes or outlines the current or given path with the current stroke style
ctx.stroke();

// Draw some lines
// First path
ctx.beginPath();
ctx.strokeStyle = "blue";
ctx.moveTo(20, 20);
ctx.lineTo(200, 20);
ctx.stroke();

// Second path
ctx.beginPath();
ctx.strokeStyle = "green";
ctx.moveTo(20, 20);
ctx.lineTo(120, 120);
ctx.stroke();
