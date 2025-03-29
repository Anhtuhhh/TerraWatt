let oceanPalette = ["#4A23D9", "#3321A6", "#252273", "#D93D04", "#D9B504"];
//"#4A23D9", "#3321A6", "#252273", "#D9B504", "#D93D04"
let waveOffset = 0;
let speedFactor = 0.03;
let graphics;
let noiseShift = 0;
let wavesPerColor = 10;

function setup() {
    createCanvas(1920, 1080);
    graphics = createGraphics(1920, 1080, SVG);
    frameRate(30);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    graphics = createGraphics(windowWidth, windowHeight, SVG);
}

function draw() {
    background(10, 10, 30);
    graphics.clear(); 

    let maxHeight = 300;
    oceanPalette.forEach((color, index) => {
        let c = colorToRGB(color);

        for (let i = 0; i < wavesPerColor; i++) {
            let heightVariation = i * 8;
            let weightVariation = 1 + i * 0.3;

            stroke(c.r, c.g, c.b);
            strokeWeight(weightVariation);
            noFill();

            graphics.stroke(c.r, c.g, c.b);
            graphics.strokeWeight(weightVariation);
            graphics.noFill();

            drawGraph(maxHeight + heightVariation, index, this);
            drawGraph(maxHeight + heightVariation, index, graphics);
        }

        maxHeight += 50;
    });

    waveOffset += speedFactor;
    noiseShift += 0.004;
}

function drawGraph(maxHeight, index, ctx) {
    ctx.beginShape();
    let freq = 0.005 + (index * 0.002);
    let amp = 100 + index * 20;
    let shift = waveOffset + index * 0.5;

    for (let x = 0; x < width; x += 4) {
        let noiseFactor = noise(x * 0.003, noiseShift) * 0.5;
        let y = maxHeight - amp * sin(x * freq + shift) - amp * noiseFactor;
        ctx.vertex(x, y);
    }
    ctx.endShape();
}

function mouseMoved() {
    let mouseSpeed = abs(mouseX - pmouseX);
    speedFactor = map(mouseSpeed, 0, 50, 0.02, 0.2, true);
}

function mousePressed() {
    save(graphics, "wavyWater.svg");
}

function colorToRGB(hexColor) {
    let c = color(hexColor);
    return { r: red(c), g: green(c), b: blue(c) };
}
