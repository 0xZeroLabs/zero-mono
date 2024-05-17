// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.22 <0.9.0;
import "@openzeppelin/contracts/access/Ownable.sol";
import "@hyperlane-xyz/core/contracts/interfaces/IMailbox.sol";

contract omSend is Ownable {
    address private operator;
    bytes32 public recipient;
    IMailbox mailbox;
    event SentMessage(uint32 destinationDomain, bytes32 recipient, bytes message);

    constructor(address _operator, address _outbox) Ownable(_operator) {
        operator = _operator;
        mailbox = IMailbox(_outbox);
    }

    function setReceipient(bytes32 _recipient) public onlyOwner {
        recipient = _recipient;
    }

    function _mint(string calldata _address) external payable {
        require(msg.value >= 0.001 ether, "Insufficient Funding");
        uint32 destination = 97;
        bytes memory _message = bytes(_address);

        mailbox.dispatch(destination, recipient, _message);
        emit SentMessage(destination, recipient, _message);
    }

    function _burn() external payable {
        require(msg.value >= 0.001 ether, "Insufficient Funding");
        // send action
    }
}
