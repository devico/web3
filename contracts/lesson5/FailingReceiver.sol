// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract FailingReceiver {
    receive() external payable {
        revert("Fail on purpose");
    }
}