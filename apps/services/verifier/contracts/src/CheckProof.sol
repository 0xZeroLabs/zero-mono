// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract CheckProof {
    address public alignedServiceManager;
    address public paymentServiceAddr;

    // replace elfCommitment
    bytes32 public elfCommitment = 0x35dd40ab04e180712996495caec915b8a7c488433acbb50c4d8d912cb55bf1f1;

    constructor(address _alignedServiceManager, address _paymentServiceAddr) {
        alignedServiceManager = _alignedServiceManager;
        paymentServiceAddr = _paymentServiceAddr;
    }

    function checkProof(
        bytes32 proofCommitment,
        bytes32 pubInputCommitment,
        bytes32 provingSystemAuxDataCommitment,
        bytes20 proofGeneratorAddr,
        bytes32 batchMerkleRoot,
        bytes memory merkleProof,
        uint256 verificationDataBatchIndex
    ) public view returns (bool) {
        require(elfCommitment == provingSystemAuxDataCommitment, "ELF does not match");

        (bool callWasSuccessful, bytes memory proofIsIncluded) = alignedServiceManager.staticcall(
            abi.encodeWithSignature(
                "verifyBatchInclusion(bytes32,bytes32,bytes32,bytes20,bytes32,bytes,uint256)",
                proofCommitment,
                pubInputCommitment,
                provingSystemAuxDataCommitment,
                proofGeneratorAddr,
                batchMerkleRoot,
                merkleProof,
                verificationDataBatchIndex,
                paymentServiceAddr
            )
        );

        require(callWasSuccessful, "static_call failed");

        bool proofIsIncludedBool = abi.decode(proofIsIncluded, (bool));
        require(proofIsIncludedBool, "proof not included in batch");

        return true;
    }
}