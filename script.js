"use strict";

//Select the myCanvas element
const c = document.getElementById("myCanvas");

// Set the canvas width and height to the window objects width and height
c.width = window.innerWidth - 5;
c.height = window.innerHeight - 5;

// getContext returns a drawing to the canvas
const ctx = c.getContext("2d");

// will return a randome whole number between 0 and the max
function genNum(min, max) {
    // return Math.floor(Math.random() * Math.floor(max));
    return Math.floor(Math.random() * (max - min) + min);
}

// Calculate
function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

// So the above works but it might be easier to try it a different way; https://editor.p5js.org/Allayna/sketches/33LX_CQM5
const circles = [];

function createCircles(num) {
    if (num < 1000) {
        while (circles.length < num) {
            // While the length of the array is less than what we want, randomly generate circle paramaters
            const circle = {
                x: genNum(120, c.width - 120),
                y: genNum(120, c.height - 120),
                r: genNum(10, 100),
            };

            let overlap = false;
            // Iterate through the array and generate the Euclidean distance in 2D.
            for (let i = 0; i < circles.length; i++) {
                const test = circles[i];
                const d = dist(circle.x, circle.y, test.x, test.y);
                // console.log(d);
                // if eucledean distance is less than the sum of two radius, push to the array
                if (d < circle.r + test.r) {
                    overlap = true;
                }
            }
            if (!overlap) {
                circles.push(circle);
            }
        }
    }
}

createCircles(10);

circles.map(function (circle) {
    console.log(circle);
    // ctx.fillStyle = "#c82124";
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = `rgba(${genNum(0, 255)}, ${genNum(0, 255)}, ${genNum(
        0,
        255
    )}, 0.3)`;
    ctx.fill();
    // ctx.stroke();
});

//

// // Get the height and width of the canvas from inside of the element
// var positionInfo = c.getBoundingClientRect();
// var height = positionInfo.height;
// var width = positionInfo.width;

//

// // Draw a circle function
// function drawCircle() {
//   ctx.beginPath();
//   ctx.arc(
//       genNum(c.width / 2),
//       genNum(c.height / 2),
//       genNum(100),
//       0,
//       2 * Math.PI
//   );
//   // ctx.fillStyle = `rgb(${genNum(255)}, ${genNum(255)}, ${genNum(255)})`;
//   ctx.fillStyle = "rgb(255, 255, 255)";
//   ctx.stroke();
// }
// // Generate a random circle
// ctx.beginPath();
// ctx.arc(genNum(c.width / 2), genNum(c.height / 2), genNum(100), 0, 2 * Math.PI);
// ctx.fill();
// ctx.stroke();

// ctx.fillStyle = "rgb(255, 255, 255)";
// ctx.fill();

// multipleCircles(5);

// // Draw multiple circles
// function multipleCircles(num) {
//   for (let i = 0; i < num; i++) {
//       drawCircle();
//   }
// }

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
