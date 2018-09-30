// Solving XOR!

let nn;

let training_data = [
  {
    inputs: [0,0],
    outputs: [0]
  },
  {
    inputs: [0,1],
    outputs: [1]
  },
  {
    inputs: [1,0],
    outputs: [1]
  },
  {
    inputs: [1,1],
    outputs: [0]
  },
]

function setup() {
  createCanvas(400, 400);
  nn = new NeuralNetwork(2, 10, 1);

  lr_slider = createSlider(0, 0.5, 0.1, 0.01); //p5 dom function


}


function draw() {
  background(0);

  // Training the neural network with training_data
  for (var i = 0; i < 1000; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.outputs);
  }

  nn.setLearningRate(lr_slider.value());

  let resol = 10;
  let cols = width / resol;
  let rows = height / resol;
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2];
      let y = nn.predict(inputs);
      fill(y*255);
      noStroke();
      rect(i*resol, j*resol, resol, resol);
    }
  }





}
