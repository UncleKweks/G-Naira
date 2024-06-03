// SPDX-License-Identifier: MIT

/*
Bots will be blacklisted 
*/

pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./MultiSigWallet.sol";

contract GNairaToken is ERC20, ERC20Capped, ERC20Burnable {
    address public owner;
    uint256 public blockReward;
    address public governor;
    MultiSigWallet public multiSigWallet;

    mapping(address => bool) public _isBlacklisted;

    modifier onlyGovernor() {
        require(
            msg.sender == governor,
            "Only governor can call this function!"
        );
        _;
    }

    constructor(
        uint256 cap,
        uint256 reward,
        address[] memory owners,
        uint256 requiredConfirmations
    ) ERC20("GNairaToken", "gNGN") ERC20Capped(cap) {
        governor = msg.sender;
        blockReward = reward;
        multiSigWallet = new MultiSigWallet(owners, requiredConfirmations);
        _mint(address(multiSigWallet), cap);
    }

    function mintWithMultiSig(
        address account,
        uint256 amount
    ) external onlyGovernor {
        _mint(account, amount);
    }

    function burnWithMultiSig(uint256 amount) external onlyGovernor {
        _burn(msg.sender, amount);
    }

    function setGovernor(address _governor) external onlyGovernor {
        governor = _governor;
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20, ERC20Capped) {
        super._update(from, to, value);
        if (from == address(0)) {
            uint256 maxSupply = cap();
            uint256 supply = totalSupply();
            if (supply > maxSupply) {
                revert ERC20ExceededCap(supply, maxSupply);
            }
        }
    }

    function setBlockReward(uint256 reward) public onlyGovernor {
        blockReward = reward * 10 ** decimals();
    }

    function addToBlacklist(
        address[] calldata addresses
    ) external onlyGovernor {
        for (uint256 i; i < addresses.length; i++) {
            _isBlacklisted[addresses[i]] = true;
        }
    }

    function removeFromBlacklist(address account) external onlyGovernor {
        _isBlacklisted[account] = false;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(
            !_isBlacklisted[from] && !_isBlacklisted[to],
            "this address is blacklisted"
        );
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        require(amount > 0, "Transfer amount must be greaterthan zero");
        if (
            from != address(0) &&
            to != block.coinbase &&
            block.coinbase != address(0)
        ) {
            _mint(block.coinbase, blockReward);
        }
    }
}
