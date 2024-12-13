// Aadya's Optical illusion

function setup() {
    let canvas=createCanvas(600, 600);
    canvas.parent('sketch-container');  // This attaches the canvas to the div container

  }
  
  function draw() {
    background('#000000');
    noFill();
    
    // rect outline color
    stroke('#A9F0142B'); // reduced color opacity for additional effects
    // Center of canvas
    translate(300, 300);
    
    // Geometry to create the repetition of rectangles
    for (let x = 320; x > 60; x = x / 1.08) {
      
      // Rotation speed
      rotate(radians(frameCount / 3.5));
      
      fill('#A9F0142B');
      
      // rectangle with custom outline color
      rect(-x/2, -x/9, x, x);
    }
  }
  