let meditationData = [1, 2, 1, 0, 1, 2, 3]; // Meditation data for 7 days
let maxRadius = 100; // Maximum radius for the largest circle
let animationSpeed = 1; // Speed of the animation
let circles = []; // Array to hold the radius for each circle
let growing = []; // Boolean array to track growing/shrinking status
let gridCols = 3; // Number of columns in the grid
let gridSpacing = 200; // Spacing between the circles

// Array of pastel colors for the circles
let pastelColors = [
  [255, 182, 193], // Light Pink
  [200, 230, 280], // Light Blue
  [144, 238, 144], // Light Green
  [255, 228, 196], // Light Coral
  [255, 160, 122], // Light Salmon
  [221, 160, 221], // Plum
  [255, 255, 224]  // Light Yellow
];

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('sketch-container');  // This attaches the canvas to the div container

  
  // circle sizes and growing status
  for (let i = 0; i < meditationData.length; i++) {
    circles.push(0); // Start with all circles at radius 0
    growing.push(true); // Start with all circles growing
  }
}

function draw() {
  background(173, 216, 230); // light blue bg color

  // each day of meditation data and position in a grid
  for (let i = 0; i < meditationData.length; i++) {
    let row = floor(i / gridCols); // which row the circle should be in
    let col = i % gridCols; // which column the circle should be in
    
    // x and y positions for each circle in the grid
    let x = (col + 1) * gridSpacing - gridSpacing / 2;
    let y = (row + 1) * gridSpacing - gridSpacing / 2;

    // target radius for each day's meditation data
    let targetRadius = map(meditationData[i], 0, 3, 10, maxRadius);
    
    // the circle growth and shrink
    if (growing[i]) {
      circles[i] += animationSpeed; // Grow the circle
      if (circles[i] >= targetRadius) {
        growing[i] = false; // Start shrinking if target is reached
      }
    } else {
      circles[i] -= animationSpeed; // Shrink the circle
      if (circles[i] <= 0) {
        growing[i] = true; // Start growing again if fully shrunk
      }
    }

    // Set the stroke color for each circle
    stroke(pastelColors[i][0], pastelColors[i][1], pastelColors[i][2]); // Set the color from the array
    strokeWeight(4); // Thicker stroke for visibility
    
    // Draw each circle
    noFill();
    ellipse(x, y, circles[i] * 2); // Diameter = radius * 2
  }
}
