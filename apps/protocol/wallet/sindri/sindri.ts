import sindri from "sindri";

export const generate = async (X: string, Y: string, type: string) => {
  const circuitIdentifier = `${type}:latest`;
  const proofInput = { X, Y };

  try {
    const proof = await sindri.proveCircuit(
      circuitIdentifier,
      JSON.stringify(proofInput)
    );
    return proof;
  } catch (error) {
    return { error };
  }
};

generate("18", "18", 'equ').then(console.log)