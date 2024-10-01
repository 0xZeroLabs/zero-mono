// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CheckProof} from "../src/CheckProof.sol";

contract CheckProofScript is Script {
    CheckProof public checker;

    function setUp() public {}

    function run(
        address _alignedServiceManager,
        address _paymentService
    ) external returns (address) {
        vm.startBroadcast();

        CheckProof verifyBatchInclusionCaller = new CheckProof(
            _alignedServiceManager,
            _paymentService
        );

        vm.stopBroadcast();

        return address(verifyBatchInclusionCaller);
    }
}
