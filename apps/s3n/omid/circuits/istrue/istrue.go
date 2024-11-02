package iseqaul

import (
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"

	"github.com/consensys/gnark-crypto/ecc"
	"github.com/consensys/gnark/backend/witness"
	"github.com/consensys/gnark/frontend"
	"github.com/consensys/gnark/std/math/bits"
)

type Circuit struct {
	B frontend.Variable `gnark:",public"`
}

func (circuit *Circuit) Define(api frontend.API) error {
	inputBit := bits.ToBinary(api, circuit.B)[0]

	api.AssertIsEqual(inputBit, 1)

	return nil
}

// Common utility for reading JSON in from a file.
func ReadFromInputPath(pathInput string) (map[string]interface{}, error) {

	absPath, err := filepath.Abs(pathInput)
	if err != nil {
		fmt.Println("Error constructing absolute path:", err)
		return nil, err
	}

	file, err := os.Open(absPath)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var data map[string]interface{}
	err = json.NewDecoder(file).Decode(&data)
	if err != nil {
		panic(err)
	}

	return data, nil
}

// Construct a witness from input data in a JSON file.
func FromJson(pathInput string) witness.Witness {

	data, err := ReadFromInputPath(pathInput)
	if err != nil {
		panic(err)
	}

	// Your witness construction logic goes here.
	B := frontend.Variable(data["B"])
	assignment := Circuit{
		B,
	}
	w, err := frontend.NewWitness(&assignment, ecc.BN254.ScalarField())
	if err != nil {
		panic(err)
	}
	return w
}
