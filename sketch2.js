//Random face generator- Aadya Singh

let eyeColor = 255;
let faceColors = ['#ffe7d1', '#e6bc98', '#d4aa78','#a16e4b','#3b2219'];// Array of 5 skin colors
let currentFaceColor;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-container');  // This attaches the canvas to the div container

  noLoop(); 
  noStroke(); 
  currentFaceColor = random(faceColors); // start with a random face color
}

function draw() {
  background('#C0E7F9');

  // Face follows the mouse position
  let faceX = mouseX;
  let faceY = mouseY;

  // Face
  let faceSize = random(100, 200);
  fill(currentFaceColor); // randomly selected face color
  ellipse(faceX, faceY, faceSize, faceSize);

  // Eyes
  let eyeSize = random(5, 70);
  let eyeOffsetX = faceSize * 0.20;
  let eyeOffsetY = faceSize * 0.09;
  let irisSize = eyeSize * 0.5; // iris is half the size of the eye

  // Left eye
  fill(eyeColor);
  ellipse(faceX - eyeOffsetX, faceY - eyeOffsetY, eyeSize, eyeSize);
  
  // Left eye iris
  fill('#382A21'); // dark brown color for the iris
  ellipse(faceX - eyeOffsetX, faceY - eyeOffsetY, irisSize, irisSize);
  
  // Right eye
  fill(eyeColor);
  ellipse(faceX + eyeOffsetX, faceY - eyeOffsetY, eyeSize, eyeSize);
  
   // Right eye iris
  fill('#382A21'); // Black color for the iris
  ellipse(faceX + eyeOffsetX, faceY - eyeOffsetY, irisSize, irisSize);

  // Mouth
  let mouthWidth = random(5, 90);
  let mouthHeight = random(1, 50);
  let mouthY = faceY + faceSize * 0.25;
  fill(0);
  ellipse(faceX, mouthY, mouthWidth, mouthHeight);


}

function mousePressed() {
  // Turn eyes red when mouse is pressed
  eyeColor = color('#FC7C7C');
  redraw(); // redraw the canvas with updated eye color
}

function mouseReleased() {
  // Reset eye color when mouse is released
  eyeColor = 255;
  redraw();
}

function mouseMoved() {
  currentFaceColor = random(faceColors); // a new random face color each time the mouse moves
  redraw(); // redraw whenever the mouse moves to update face position and color
}
