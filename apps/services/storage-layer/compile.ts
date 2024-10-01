import sindri from 'sindri';
import minimist from "minimist";

const args = minimist(process.argv.slice(2));
console.log("Compiling:", args._[0])

const circuit = await sindri.createCircuit("./server/controllers/proofs/" + args._[0]);

// Log out the circuit object as JSON.
console.log(JSON.stringify(circuit, null, 2));