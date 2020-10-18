function setup() {
    var canvas = createCanvas(600, 600);
    var p5 = document.querySelector(".flashing");
    canvas.parent(p5);
    noCursor();
  }
  
  function draw() {
    let vermelho = map(mouseY, 0, height, 5, 255);
    background(220);
    frameRate(10);
    let azul = map(mouseX, 0, width, 30, 255);
  
    for (var x = 0; x < width; x = x + 20) {
      for (var y = 0; y < width; y = y + 20) {
        //var d = dist(0, 0, x, y);
  
        stroke(255);
        strokeWeight(1);
        // noStroke();
        fill(random(0, 255), 0, random(0, 255));
        rect(x, y, 20, 20);
      }
  
    }
  }