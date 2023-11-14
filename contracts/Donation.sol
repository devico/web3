// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract Donation {
    address public owner;
    address[] public donators;
    mapping(address => uint256) public donations;

    error ZeroEther();
    error OnlyOwner();
    error InsufficientFunds();
    error EtherSendError();

    constructor() {
        owner = msg.sender;
    }

    receive() external payable {
        if (msg.value == 0) {
            revert ZeroEther();
        }

        donate();
    }

    function donate() public payable {
        bool isNewDonator = true;

        for (uint256 i = 0; i < donators.length; i++) {
            if (donators[i] == msg.sender) {
                isNewDonator = false;
                break;
            }
        }
        
        if (isNewDonator) {
            donators.push(msg.sender);
        }
        
        donations[msg.sender] += msg.value;
    }

    function getDonators() external view returns (address[] memory) {
        return donators;
    }

    
    function getSumOfDonations() external view returns (uint256) {
        uint256 totalDonations = 0;

        for (uint256 i = 0; i < donators.length; i++) {
            totalDonations += donations[donators[i]];
        }

        return totalDonations;
    }

    function sendHelp(address to, uint256 amount) external {
        if (msg.sender != owner) {
            revert OnlyOwner();
        }

        if (address(this).balance < amount) {
            revert InsufficientFunds();
        }

        (bool success, ) = to.call{value: amount}("");

        if (!success) {
            revert EtherSendError();
        }
    }
}