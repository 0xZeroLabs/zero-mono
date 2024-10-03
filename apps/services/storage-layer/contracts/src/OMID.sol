// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * This is ZERO Protocol's OMID Human Bound Token, following Vitalik's
 * co-authored whitepaper at:
 * https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763
 *
 * Wroked around to fit ERC721 standard tokens
 *
 */
contract OMID is ERC721, ERC721URIStorage {
    struct State {
        address id;
        address human;
    }

    struct Human {
        address id;
        bool verified;
        uint256 created;
        uint256 updated;
    }

    struct Credential {
        address human;
        address merkleroot;
    }

    mapping(address => Human) private humans;
    mapping(address => Credential) private humanCredentials;
    mapping(address => address[]) private credentials;

    address public operator;
    string private ipfsCID;
    bytes32 private zeroHash = 0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563;
    bytes32 private zeroHash2 = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;

    event Mint(address _human);
    event Burn(address _human);
    event Update(address _human);
    event CreateCredential(address _merkleroot);
    event UpdateCredential(address _merkleroot);
    event DeleteCredential(address _merkleroot);

    constructor(string memory _ipfsCID) ERC721("OMNI IDENTITY", "OMID") {
        operator = msg.sender;
        ipfsCID = _ipfsCID;
    }

    function setOperator(address _operator) external {
        require(msg.sender == operator, "Only operator can appoint new operator");
        operator = _operator;
    }

    function setIPFS(string memory _ipfsCID) external {
        require(msg.sender == operator, "Only operator can set new ipsCID");
        ipfsCID = _ipfsCID;
    }

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = _ownerOf(tokenId);
        require(from == address(0), "Token not transferable");
        super._update(to, tokenId, auth);
        return from;
    }

    function mint(address _human, bool _verified) external {
        require(keccak256(abi.encode(humans[_human].created)) == zeroHash, "OMID already exists");
        require(msg.sender == operator, "Only operator can create new human");
        humans[_human].id = _human;
        humans[_human].verified = _verified;
        humans[_human].created = block.timestamp;
        _setTokenURI(0, string(abi.encodePacked("ipfs://", ipfsCID)));
        _mint(_human, 0);
        emit Mint(_human);
    }

    function burn(address _human) external {
        require(
            msg.sender == operator || msg.sender == operator,
            "Only operators and users have rights to delete a user's data"
        );
        require(keccak256(abi.encode(humans[_human].created)) != zeroHash, "Human does not exist");
        delete humans[_human];
        emit Burn(_human);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return interfaceId == bytes4(0x49064906) || super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        tokenId = 0;
        return super.tokenURI(tokenId);
    }

    function update(address _human, bool _verified) external {
        require(msg.sender == operator, "Only operator can update human data");
        require(keccak256(abi.encode(humans[_human].created)) != zeroHash, "Human does not exist");
        humans[_human].verified = _verified;
        humans[_human].updated = block.timestamp;
        emit Update(_human);
    }

    function hasHuman(address _human) external view returns (bool) {
        return (keccak256(abi.encode(humans[_human].created)) != zeroHash);
    }

    function isVerified(address _human) external view returns (bool) {
        return humans[_human].verified;
    }

    function getHuman(address _human) external view returns (Human memory) {
        return humans[_human];
    }

    /**
     * Credentials are used to store commitments of 3rd party issuers.
     * Data is stored in a nested mapping relative to credential's merkleroot
     * By default they can only store data on addresses that have been minted
     */
    function createCredential(address _human, address _merkleroot) external {
        require(keccak256(abi.encode(humans[_human].created)) != zeroHash, "Human doesn't exists");
        require(
            keccak256(abi.encode(humanCredentials[_merkleroot].merkleroot)) == zeroHash, "Credential already exists"
        );
        require(msg.sender == operator, "Only operator can create new human");
        humanCredentials[_merkleroot].merkleroot = _merkleroot;
        humanCredentials[_merkleroot].human = _human;
        credentials[_human].push(_merkleroot);
        emit CreateCredential(_human);
    }

    function deleteCredential(address _merkleroot) external {
        require(keccak256(abi.encode(humans[_merkleroot].created)) != zeroHash, "Human doesn't exists");
        require(
            keccak256(abi.encode(humanCredentials[_merkleroot].merkleroot)) != zeroHash, "Credential doesn't exists"
        );
        require(
            msg.sender == operator || msg.sender == operator,
            "Only operators and users have rights to delete a user's data"
        );
        delete humanCredentials[_merkleroot];
        emit DeleteCredential(_merkleroot);
    }

    function updateCredential(address _human, address _merkleroot) external {
        require(keccak256(abi.encode(humans[_human].created)) != zeroHash, "Human doesn't exists");
        require(
            keccak256(abi.encode(humanCredentials[_merkleroot].merkleroot)) != zeroHash, "Credential doesn't exists"
        );
        require(
            msg.sender == operator || msg.sender == operator,
            "Only operators and users have rights to delete a user's data"
        );
        humanCredentials[_human].merkleroot = _merkleroot;
        emit DeleteCredential(_human);
    }

    function hasCredential(address _human) external view returns (bool) {
        return (keccak256(abi.encode(credentials[_human])) != zeroHash);
    }

    function getCredentials(address _human) external view returns (address[] memory) {
        return credentials[_human];
    }

    function getCredentialOwner(address _merkleroot) external view returns (address) {
        return humanCredentials[_merkleroot].human;
    }
}
