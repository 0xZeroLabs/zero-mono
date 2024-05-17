// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.22 <0.9.0;

interface omPassport {
    function mint() external;

    function burn() external;
}

contract omReceive {
    omPassport public omPass;
    address private operator;

    constructor(address _address, address _operator) {
        omPass = omPassport(_address);
        operator = _operator;
    }

    /**
     * add receiving function to enable omnichain minting and burning
     */

    function _mint() public payable {
        require (msg.value >= 0.001 ether, "Insufficient Funding");
        omPass.mint();
    }

    function _burn() public payable {
        require (msg.value >= 0.001 ether, "Insufficient Funding");
        omPass.burn();
    }
}
