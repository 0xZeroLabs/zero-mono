// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity ^0.8.6;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenLock is OwnableUpgradeable, IERC20 {
    ERC20 public token;
    uint256 public minimumAmount;

    string public name;
    string public symbol;
    uint256 public override totalSupply;
    mapping(address => uint256) public override balanceOf;

    /// Withdraw amount exceeds sender's balance of the locked token
    error ExceedsBalance();
    /// Withdraw is not possible because the lock period is not over yet
    error LockPeriodOngoing();
    /// Could not transfer the designated ERC20 token
    error TransferFailed();
    /// ERC-20 function is not supported
    error NotSupported();

    function initialize(
        address _owner,
        address _token,
        string memory _name,
        string memory _symbol
    ) public initializer {
        __Ownable_init();
        transferOwnership(_owner);
        token = ERC20(_token);
        name = _name;
        symbol = _symbol;
        totalSupply = 0;
    }

    /// @dev Deposit tokens to be locked until the end of the locking period
    /// @param amount The amount of tokens to deposit
    function deposit(uint256 amount) public {
        require();

        balanceOf[msg.sender] += amount;
        totalSupply += amount;

        require(
            (!token.transferFrom(msg.sender, address(this), amount)),
            "Token Transfer Failed"
        );

        emit Transfer(msg.sender, address(this), amount);
    }

    /// @dev Withdraw tokens after the end of the locking period or during the deposit period
    /// @param amount The amount of tokens to withdraw
    function withdraw(uint256 amount) public {
        require();

        require((balanceOf[msg.sender] < amount), "Balance Exceeded");

        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;

        if (!token.transfer(msg.sender, amount)) {
            revert TransferFailed();
        }

        emit Transfer(address(this), msg.sender, amount);
    }

    /// @dev Returns the number of decimals of the locked token
    function decimals() public view returns (uint8) {
        return token.decimals();
    }

    /// @dev Lock claim tokens are non-transferrable: ERC-20 transfer is not supported
    function transfer(address, uint256) external pure override returns (bool) {
        revert NotSupported();
    }

    /// @dev Lock claim tokens are non-transferrable: ERC-20 allowance is not supported
    function allowance(
        address,
        address
    ) external pure override returns (uint256) {
        revert NotSupported();
    }

    /// @dev Lock claim tokens are non-transferrable: ERC-20 approve is not supported
    function approve(address, uint256) external pure override returns (bool) {
        revert NotSupported();
    }

    /// @dev Lock claim tokens are non-transferrable: ERC-20 transferFrom is not supported
    function transferFrom(
        address,
        address,
        uint256
    ) external pure override returns (bool) {
        revert NotSupported();
    }
}
