// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract SwapLock {
    uint public unlockTime;
    address payable public owner;
    address payable public recipient;
    bool approve;

    event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime, address receiver) payable {
        // require(
        //     block.timestamp < _unlockTime,
        //     "Unlock time should be in the future"
        // );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
        recipient = payable(receiver);
        approve = false;
    }

    function setApprove() public {
        require(msg.sender == owner);
        require(approve == false);
        approve = true;
        // ideally, store signed message of EAS from BCH onto this contract
    }

    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        owner.transfer(address(this).balance);
    }

    function exchange() public {
        require(msg.sender == recipient, "You aren't the recipient");
        require(approve == true, "Owner has not approved yet");
        
        emit Withdrawal(address(this).balance, block.timestamp);

        recipient.transfer(address(this).balance);
    }
}
