// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title Funds - Smart contract for managing donations and charitable foundations.
contract Funds is Ownable {
    mapping(address => address) public foundations;

    /// @dev Event of creation of a new charitable foundation.
    event NewFoundationCreated(address indexed creator, address indexed foundationAddress, address donationReceiver, string description);

    error ZeroEther();
    error ZeroDonation();
    error OnlyOwner();
    error InsufficientFunds();
    error EtherSendError();
    error NotFoundationOwner();

    constructor() Ownable()  {}

    receive() external payable {
        if (msg.value == 0) {
            revert ZeroEther();
        }
    }

    /// @dev Creates a new FoundationContract and registers it in the 'foundations' mapping.
    /// @param _donationReceiver The address of the donation receiver for the foundation.
    /// @param _description A description of the foundation.
    function createFoundation(address _donationReceiver, string memory _description) external payable {
        FoundationContract newFoundation = new FoundationContract{value: msg.value}(_donationReceiver, _description);

        foundations[address(newFoundation)] = msg.sender;

        emit NewFoundationCreated(msg.sender, address(newFoundation), _donationReceiver, _description);
    }
    

    /// @dev Transfer funds to the recipient of the foundation.
    /// @param foundationAddress Address of the foundation to which funds should be transferred.
    /// @param amount The amount to send.
    function transferFundsToReceiver(address payable foundationAddress, uint256 amount) external {
        if (amount == 0) {
            revert ZeroEther();
        }

        FoundationContract foundation = FoundationContract(foundationAddress);

        if (foundations[foundationAddress] != msg.sender) {
            revert NotFoundationOwner();
        }

        foundation.sendFundsToReceiver(amount);
    }
}

contract FoundationContract is Ownable {
    address public receiver;
    string public description;
    address[] public donators;
    mapping(address => uint256) public donations;

    error ZeroEther();
    error EtherSendError();

    constructor(address donationReceiver, string memory desc) Ownable() payable {
        receiver = donationReceiver;
        description = desc;
        donators.push(tx.origin);
        donations[tx.origin] += msg.value;
    }

    receive() external payable {
        if (msg.value == 0) {
            revert ZeroEther();
        }

        donate();
    }

    /// @dev The donate function allows you to send donations to a contract.
    function donate() public payable {
        if (donations[msg.sender] == 0) {
            donators.push(msg.sender);
        }
        
        donations[msg.sender] += msg.value;
    }

    /// @dev Send funds to the recipient.
    function sendFundsToReceiver(uint256 amount) public payable onlyOwner {
        if (amount == 0) {
            revert ZeroEther();
        }
        
        (bool success, ) = receiver.call{value: amount}("");

        if (!success) {
            revert EtherSendError();
        }
    }
}
