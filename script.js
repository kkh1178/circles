"use strict";

//Select the myCanvas element
const c = document.getElementById("myCanvas");

// Set the canvas width and height to the window objects width and height
c.width = window.innerWidth - 5;
c.height = window.innerHeight - 5;

// getContext returns a drawing to the canvas
const ctx = c.getContext("2d");

// will return a randome whole number between the min and the max
function genNum(min, max) {
    // return Math.floor(Math.random() * Math.floor(max));
    return Math.floor(Math.random() * (max - min) + min);
}

// Calculate the Euclidean distance
function dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

// So the drawcircle function works but it might be easier to try it a different way;
// https://editor.p5js.org/Allayna/sketches/33LX_CQM5
// const circles = [];

// function createCircles(num) {
//     if (num < 100) {
//         while (circles.length < num) {
//             // While the length of the array is less than what we want, randomly generate circle paramaters
//             const circle = {
//                 x: genNum(120, c.width - 120),
//                 y: genNum(120, c.height - 120),
//                 r: genNum(10, 100),
//             };

//             let overlap = false;
//             // Iterate through the array and generate the Euclidean distance in 2D.
//             for (let i = 0; i < circles.length; i++) {
//                 const test = circles[i];
//                 const d = dist(circle.x, circle.y, test.x, test.y);
//                 // console.log(d);
//                 // if eucledean distance is less than the sum of two radius (plus a buffer to keep the circles from
//                 // partially disappearing), push to the array
//                 if (d < circle.r + test.r + 70) {
//                     overlap = true;
//                 }
//             }
//             if (!overlap) {
//                 circles.push(circle);
//             }
//         }
//     }
// }

// createCircles(10);

// Making a fake set of circles for testing
const fake = [
    { x: 948, y: 629, r: 39, c: "rgba(100, 116, 225, 0.301960784313725)" },
    { x: 916, y: 172, r: 45, c: "rgba(107, 203, 153, 0.301960784313725)" },
    { x: 166, y: 548, r: 60, c: "rgba(64, 191, 167, 0.301960784313725)" },
    { x: 462, y: 568, r: 52, c: "rgba(93, 249, 117, 0.301960784313725)" },
    { x: 637, y: 192, r: 87, c: "rgba(158, 9, 209, 0.301960784313725)" },
    { x: 420, y: 367, r: 62, c: "rgba(96, 234, 219, 0.301960784313725)" },
    { x: 183, y: 202, r: 39, c: "rgba(176, 66, 223, 0.301960784313725)" },
    { x: 718, y: 581, r: 98, c: "rgba(46, 249, 40, 0.301960784313725)" },
    { x: 1044, y: 503, r: 27, c: "rgba(30, 202, 113, 0.301960784313725)" },
    { x: 409, y: 180, r: 53, c: "rgba(202, 156, 224, 0.301960784313725)" },
];

// Generating the circles based on the array created by createCircles
fake.map(function (circle) {
    console.log(circle);
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fillStyle = circle.c;
    // ctx.fillStyle = `rgba(${genNum(0, 255)}, ${genNum(0, 255)}, ${genNum(
    //     0,
    //     255
    // )}, 0.3)`;
    // console.log(ctx.fillStyle);
    ctx.fill();
    ctx.strokeStyle = circle.c;
    ctx.stroke();
});

//

//

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
