import sindri from "sindri";

export const generate = async (X: number, Y: number, type: string) => {
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
