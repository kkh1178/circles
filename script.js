"use strict";

// // Get the height and width of the canvas from inside of the element
// var positionInfo = c.getBoundingClientRect();
// var height = positionInfo.height;
// var width = positionInfo.width;

//Select the myCanvas element
const c = document.getElementById("myCanvas");

// Set the canvas width and height to the window objects width and height
c.width = window.innerWidth - 5;
c.height = window.innerHeight - 5;

// getContext returns a drawing to the canvas
const ctx = c.getContext("2d");

// will return a randome whole number between 0 and the max
function genNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// Generate a random circle
ctx.beginPath();
ctx.arc(genNum(c.width / 2), genNum(c.height / 2), genNum(100), 0, 2 * Math.PI);
ctx.fill();
ctx.stroke();

ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fill;

// Draw a circle function
function drawCircle() {
    ctx.beginPath();
    ctx.arc(
        genNum(c.width / 2),
        genNum(c.height / 2),
        genNum(100),
        0,
        2 * Math.PI
    );
    // ctx.fill(genNum(255), genNum(255), genNum(255), 120);
    ctx.stroke();
}

// Draw multiple circles
function multipleCircles(num) {
    for (let i = 0; i < num; i++) {
        drawCircle();
    }
}

multipleCircles(5);

// // Lets try to make more than one circle and NOT let them overlap
// function generateCircles(c, num) {
//   while (num < 10)
//     c.beginPath();
//     c.arc(
//         genNum(c.width / 2),
//         genNum(c.height / 2),
//         genNum(100),
//         0,
//         2 * Math.PI
//     );
//     c.stroke();
// }

//

// beginpath is called before the beginning of each line
// ctx.beginPath();
// // Adds a circle to the canvas (x, y, radius, startAngle, endAngle, [, anticlockwise])
// ctx.arc(100, 75, 50, 0, 2 * Math.PI);
// // strokes or outlines the current or given path with the current stroke style
// ctx.stroke();

// // Trying another circle
// ctx.beginPath();
// // Adds a circle to the canvas (x, y, radius, startAngle, endAngle, [, anticlockwise])
// ctx.arc(200, 125, 100, 0, 2 * Math.PI);
// // strokes or outlines the current or given path with the current stroke style
// ctx.stroke();
