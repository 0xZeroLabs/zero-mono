// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Ownable {
    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
}

contract PassportParser is Ownable {
    constructor() public {}

    enum VerificationStatus {
        Pending,
        Verified,
        Rejected,
        Blacklisted
    }

    struct ID {
        uint id;
        uint created;
        uint updated;
        address wallet;
        string data;
        VerificationStatus status;
    }

    mapping(address => ID) public ids;

    function addID(address _wallet, string memory _data) public onlyOwner {
        uint newID = uint(keccak256(abi.encodePacked(_wallet)));

        require(ids[_wallet].id == 0, "ID already exists for this address");

        ids[_wallet] = ID({
            id: newID,
            created: block.timestamp,
            updated: block.timestamp,
            wallet: _wallet,
            data: _data,
            status: VerificationStatus.Pending
        });
    }

    // ID functions, these are prior to be changed and moved to locations where they matter
    function changeStatus(
        address _wallet,
        VerificationStatus _status
    ) public onlyOwner {
        require(ids[_wallet].id > 0, "ID does not exist for this address");

        ids[_wallet].status = _status;
        ids[_wallet].updated = block.timestamp;
    }

    function updateID(address _wallet, string memory _data) public onlyOwner {
        require(ids[_wallet].id > 0, "ID does not exist for this address");

        ids[_wallet].data = _data;
        changeStatus(_wallet, VerificationStatus.Pending);
    }

    // these are more prior to change positions
    function blacklistID(address _wallet) public onlyOwner {
        changeStatus(_wallet, VerificationStatus.Blacklisted);
    }

    function whitelistID(address _wallet) public onlyOwner {
        changeStatus(_wallet, VerificationStatus.Verified);
    }

    function rejectID(address _wallet) public onlyOwner {
        changeStatus(_wallet, VerificationStatus.Rejected);
    }

    function getID(address _wallet) public view returns (ID memory) {
        require(ids[_wallet].id > 0, "ID does not exist");

        return ids[_wallet];
    }
}
