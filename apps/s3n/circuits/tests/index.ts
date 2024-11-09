import sindri from "sindri";

export const generateProof = async (
) => {
  const circuitInputs = {  };

  try {
    const proof = await sindri.proveCircuit(
      "proof:latest",
      JSON.stringify(circuitInputs)
    );
    return proof;
  } catch (error) {
    console.error("Proof generation error:", error);
    return { error };
  }
};


generateProof().then(console.log);
