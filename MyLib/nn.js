function sigmoid(x) { // Activiation Function; Normalizes a value between 0 and 1;
  return 1 / (1 + Math.exp(-x));
}
function dsigmoid(y) { // Parameter y has already been passed through sigmoid function
  //return sigmoid(x) * (1- sigmoid(x));
  return y * (1 - y);
}

class NeuralNetwork {

  constructor (input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);
    this.weights_ih.randomize();
    this.weights_ho.randomize();

    // console.log("These are weights from INPUT to HIDDEN");
    // this.weights_ih.print();
    // console.log("These are weights from HIDDEN to OUTPUT");
    // this.weights_ho.print();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);
    this.bias_h.randomize();
    this.bias_o.randomize();

    this.setLearningRate();
  }

  printWeights () {
    console.log("Weights matrix between input and hidden layers");
    this.weights_ih.print();
    console.log("Weights matrix between hidden and output layers");
    this.weights_ih.print();

  }

  predict (input_array) { //formally feedforward

    // Generating the hidden outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // ACTIVATION FUNCTION!
    hidden.map(sigmoid);

    // Generating the output's outputs
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);



    // Sending back to caller!
    return output.toArray();
  }

  setLearningRate(learning_rate = 0.1) {  // Function to set learning rate; DEFAULT IS 0.1
    this.learning_rate = learning_rate;
  }

  train(input_array, target_array) { //Stochastic Gradient Descent

    /****** FEEDFORWARD FUNCITON ******/
    // Generating the hidden outputs
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    // ACTIVATION FUNCTION!
    hidden.map(sigmoid);

    // Generating the output's outputs
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);
    // console.log("outputs")
    // outputs.print();
    /*********************************/

    // Convert array to matrix object
    let targets = Matrix.fromArray(target_array);
    // console.log("targets")
    // targets.print();

    // Calc the error of outputs
    // ERROR = TARGET - OUTPUTS
    let output_errors = Matrix.subtract(targets, outputs); //returns vector of errors
    // console.log("output_erros")
    // output_errors.print();

    // let gradient = outputs * (1 - outputs);
    // Calculate gradient
    let gradients = Matrix.map(outputs, dsigmoid);
    // console.log("gradient")
    // gradients.print();

    gradients.multiply(output_errors);
    // console.log("gradient mult output errors")
    // gradients.print();
    gradients.multiply(this.learning_rate);


    // Calculate deltas
    let hidden_T = Matrix.transpose(hidden);
    let weights_ho_deltas = Matrix.multiply(gradients, hidden_T);

    // console.log("These are delta weights from HIDDEN to OUTPUT");
    // this.weights_ho_deltas.print();
    // console.log("These are weights from HIDDEN to OUTPUT");
    // this.weights_ho.print();

    // Adjust weights by deltas
    this.weights_ho.add(weights_ho_deltas);
    // Adjust the bias by its deltas (which is simply the gradients)
    this.bias_o.add(gradients);




    // Calculate the hidden layer errors
    let who_t = Matrix.transpose(this.weights_ho)
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // Calculate hidden gradient
    let hidden_gradients = Matrix.map(hidden, dsigmoid);
    hidden_gradients.multiply(hidden_errors);
    hidden_gradients.multiply(this.learning_rate);

    // Calculate input -> hidden deltas
    let inputs_T = Matrix.transpose(inputs);
    let weights_ih_deltas = Matrix.multiply(hidden_gradients, inputs_T);
    // Add deltas to weights
    this.weights_ih.add(weights_ih_deltas);
    // Adjust the bias by its deltas (which is simply the gradients)
    this.bias_h.add(hidden_gradients);





  }

}
