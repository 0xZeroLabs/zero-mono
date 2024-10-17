// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {OMID} from "../src/OMID.sol";

contract CheckProofScript is Script {
    OMID public checker;

    function setUp() public {}

    function run(string memory _cid) external returns (address) {
        vm.startBroadcast();

        OMID verifyBatchInclusionCaller = new OMID(_cid);

        vm.stopBroadcast();

        return address(verifyBatchInclusionCaller);
    }
}
