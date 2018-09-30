// Solving XOR!
let training_data = [{
    inputs: [0,1],
    targets: [1]
  },
  {
    inputs: [1,0],
    targets: [1]
  },
  {
    inputs: [0,0],
    targets: [0]
  },
  {
    inputs: [1,1],
    targets: [0]
  }
];

function setup() {

  let nn = new NeuralNetwork(2, 2, 1);

  for (var i = 0; i < 100000; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);
  }

  // console.log("");
  // console.log("");
  console.log("1,0 should give me 1");
  console.log(nn.feedforward([1,0]));
  console.log("0,1 should give me 1");
  console.log(nn.feedforward([0,1]));
  console.log("1,1 should give me 0");
  console.log(nn.feedforward([1,1]));
  console.log("0,0 should give me 0");
  console.log(nn.feedforward([0,0]));

}


function draw() {


}
