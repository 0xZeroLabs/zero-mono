// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@eigenlayer/contracts/libraries/BytesLib.sol";
import "@eigenlayer-middleware/src/ServiceManagerBase.sol";

/**
 * @title MPC Key Share Module
 * @author ZERO Labs
 */
contract IncredibleSquaringServiceManager is ServiceManagerBase {
    constructor(
        IAVSDirectory _avsDirectory,
        IRegistryCoordinator _registryCoordinator,
        IStakeRegistry _stakeRegistry,
        IIncredibleSquaringTaskManager _incredibleSquaringTaskManager
    ){}

    /// @notice Called in the event of challenge resolution, in order to forward a call to the Slasher, which 'freezes' the `operator`.
    /// @dev The Slasher contract is under active development and its interface expected to change.
    ///      We recommend writing slashing logic without integrating with the Slasher at this point in time.
    function freezeOperator(
        address operatorAddr
    ) external onlyIncredibleSquaringTaskManager {
        // slasher.freezeOperator(operatorAddr);
    }
}