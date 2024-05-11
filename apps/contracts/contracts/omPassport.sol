// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/**
 * An experiment in Soul Bound Tokens (SBT's) following Vitalik's
 * co-authored whitepaper at:
 * https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4105763
 *
 * Edited to include created and updated timestamps
 * Based around ERC721 standards
 */

contract omPassport is ERC721, ERC721URIStorage {
    uint256 private _tokenIdCounter;

    enum VerificationStatus {
        Verified,
        PendingAppeal,
        Blacklisted
    }

    struct Soul {
        // contains zkHash
        string identity;
        // add issuer specific fields below
        uint256 score;
        VerificationStatus status;
        uint256 created;
        uint256 updated;
    }

    mapping(address => Soul) private souls;
    mapping(address => mapping(address => Soul)) soulProfiles;
    mapping(address => address[]) private profiles;

    address public operator;
    bytes32 private zeroHash =
        0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
    bytes4 private constant ERC4906_INTERFACE_ID = bytes4(0x49064906);

    event Mint(address _soul);
    event Burn(address _soul);
    event Update(address _soul);
    event SetProfile(address _profiler, address _soul);
    event RemoveProfile(address _profiler, address _soul);

    constructor() ERC721("OmniPassport", "omPASS") {
        operator = msg.sender;
    }

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        require(from == address(0), "Token not transferable");
        super._update(to, tokenId, auth);
        return from;
    }

    function mint(address _soul, Soul memory _soulData) external {
        require(
            keccak256(bytes(souls[_soul].identity)) == zeroHash,
            "Soul already exists"
        );
        require(msg.sender == operator, "Only operator can mint new souls");
        souls[_soul] = _soulData;
        souls[_soul].status = VerificationStatus.Verified;
        souls[_soul].created = block.timestamp;
        _tokenIdCounter += 1;
        _mint(_soul, _tokenIdCounter);
        emit Mint(_soul);
    }

    function burn(address _soul) external {
        require(
            msg.sender == _soul || msg.sender == operator,
            "Only users and issuers have rights to delete their data"
        );
        delete souls[_soul];
        for (uint256 i = 0; i < profiles[_soul].length; i++) {
            address profiler = profiles[_soul][i];
            delete soulProfiles[profiler][_soul];
        }
        _burn(1);
        super._burn(1);
        emit Burn(_soul);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return
            interfaceId == ERC4906_INTERFACE_ID ||
            super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        tokenId = 1;
        return super.tokenURI(tokenId);
    }

    function update(address _soul, Soul memory _soulData) external {
        require(msg.sender == operator, "Only operator can update soul data");
        require(
            keccak256(bytes(souls[_soul].identity)) != zeroHash,
            "Soul does not exist"
        );
        souls[_soul] = _soulData;
        souls[_soul].updated = block.timestamp;
        emit Update(_soul);
    }

    function hasSoul(address _soul) external view returns (bool) {
        if (keccak256(bytes(souls[_soul].identity)) == zeroHash) {
            return false;
        } else {
            return true;
        }
    }

    function getSoul(address _soul) external view returns (Soul memory) {
        return souls[_soul];
    }

    /**
     * Profiles are used by 3rd parties and individual users to store data.
     * Data is stored in a nested mapping relative to msg.sender
     * By default they can only store data on addresses that have been minted
     */
    function setProfile(address _soul, Soul memory _soulData) external {
        require(
            keccak256(bytes(souls[_soul].identity)) != zeroHash,
            "Cannot create a profile for a soul that has not been minted"
        );
        soulProfiles[msg.sender][_soul] = _soulData;
        profiles[_soul].push(msg.sender);
        emit SetProfile(msg.sender, _soul);
    }

    function getProfile(
        address _profiler,
        address _soul
    ) external view returns (Soul memory) {
        return soulProfiles[_profiler][_soul];
    }

    function listProfiles(
        address _soul
    ) external view returns (address[] memory) {
        return profiles[_soul];
    }

    function hasProfile(
        address _profiler,
        address _soul
    ) public view returns (bool) {
        if (
            keccak256(bytes(soulProfiles[_profiler][_soul].identity)) ==
            zeroHash
        ) {
            return false;
        } else {
            return true;
        }
    }

    function removeProfile(address _profiler, address _soul) external {
        require(
            msg.sender == _soul,
            "Only users have rights to delete their profile data"
        );
        require(hasProfile(_profiler, _soul), "Profile does not exist");
        delete soulProfiles[_profiler][msg.sender];
        emit RemoveProfile(_profiler, _soul);
    }
}
