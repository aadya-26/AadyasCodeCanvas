let totalDuration = 60000; // 1 minute in milliseconds
let growthDuration = 4000; // 4 seconds for inhale
let shrinkDuration = 4500; // 4.5 seconds for exhale
let maxSize = 280; // Maximum flower size
let minSize = 60; // Minimum flower size
let isRunning = false; // Track whether the clock is running
let startTime; // Track the time when the mouse is pressed

let angle = 0; // Variable to control the rotation
let flowerSize = minSize; // Initial size of the flower

let alphaValue = 0; // Variable to store the alpha value for fading text
let hasCompletedFirstCycle = false; // Track if the first cycle is completed
let isTextVisible = true; // Track the visibility of the initial text

function setup() {
  canvas = createCanvas(600, 600);
  canvas.parent('sketch-container');  // This attaches the canvas to the div container

  textAlign(CENTER, CENTER); // Align text to the center
  textSize(32); // Set text size
  noStroke();
  background('#ADD8E6'); // light blue bg
  // Draw the initial smallest flower
  drawFlower(flowerSize);

}

function draw() {
  background('#ADD8E6'); // Clear the canvas each frame to light blue
  
  if (isRunning) {
    let currentTime = millis() - startTime; // Time since the exercise started
    
    let cycleDuration = growthDuration + shrinkDuration; // Total duration of 1 full cycle
    let timeInCycle = (currentTime % cycleDuration) / cycleDuration; // Time in cycle normalized to [0, 1]
    
    // Determine flower size during inhale and exhale phases
    if (timeInCycle <= 0.5) { // Inhale phase
      flowerSize = map(timeInCycle, 0, 0.5, minSize, maxSize);
      if (!hasCompletedFirstCycle) {
        fadeText("Breathe In", true); // Fade in "Breathe In"
      }
    } else { // Exhale phase
      flowerSize = map(timeInCycle, 0.5, 1, maxSize, minSize);
      if (!hasCompletedFirstCycle) {
        fadeText("Breathe Out", false); // Fade out "Breathe Out"
      }
    }

    // Check if the first cycle is completed
    if (currentTime >= cycleDuration && !hasCompletedFirstCycle) {
      hasCompletedFirstCycle = true; // Set to true after the first full cycle
    }

    // Stop the exercise after 1 minute
    if (currentTime >= totalDuration) {
      isRunning = false;
    }
  } else if (isTextVisible) {
    // Display the initial instruction text when not running
    fill(255); // White color for the initial text
    text("Inhale tranquility,\nExhale stress", width / 2, height - 100); // Show initial text
  }

  // Draw the rotating flower
  drawFlower(flowerSize);
}

function drawFlower(size) {
  translate(width / 2, height / 2); // Move the origin to the center of the canvas
  
  let petalCount = 6; // Number of petals
  let petalLength = size; // Length of each petal
  let petalWidth = size / 2; // Width of each petal

  fill('#ffffff'); // White color for petals
  for (let i = 0; i < petalCount; i++) {
    push(); // Save the current transformation
    rotate(angle + TWO_PI * i / petalCount); // Rotate by equal amounts for each petal
    ellipse(0, petalLength / 2, petalWidth, petalLength); // Draw the petal
    pop(); // Restore the previous transformation
  }

  // Draw the center of the flower
  fill(255, 204, 0); // Yellow color for the center
  ellipse(0, 0, 50, 50); // Draw the flower center

  angle += 0.005; // Gradually increase the angle to create slow and smooth rotation
}

function fadeText(message, isFadingIn) {
  // Adjust the alpha value based on whether we're fading in or out
  if (isFadingIn) {
    alphaValue = map(flowerSize, minSize, maxSize, 0, 255); // Fade in as flower grows
  } else {
    alphaValue = map(flowerSize, maxSize, minSize, 255, 0); // Fade out as flower shrinks
  }
  
  fill(255, 255, 255, alphaValue); // Set the fill with alpha for fading
  text(message, width / 2, height - 100); // Display text near the bottom of the canvas
}

function mousePressed() {
  if (!isRunning) {
    startTime = millis(); // Record the time when exercise starts
    isRunning = true; // Activate the breathing exercise
    hasCompletedFirstCycle = false; // Reset the cycle completion state
    isTextVisible = false; // Hide the initial text when mouse is pressed
  }
}
