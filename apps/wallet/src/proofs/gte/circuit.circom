pragma circom 2.0.8;

// You can include files from `circomlib` like this.
include "node_modules/circomlib/circuits/comparators.circom";

template Main(n) {
    signal input X;
    signal input Y;
    signal output type;
    signal output out;

    // Concatenate ASCII codes for gte
    var concatenated = 103116101;

    type <== concatenated;
    component gte = GreaterEqThan(n);
    gte.in[0] <== X;
    gte.in[1] <== Y;

    out <== gte.out;
}

component main {public [Y]} = Main(16);
