// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Campaign {
    string public title;
    string public category;
    string public description;
    string public image;
    uint256 public targetAmount;
    uint256 public targetTimestamp;
    address public owner;

    mapping(address => uint256) public donaters;

    event FundDonated(
        address indexed campaign,
        address indexed donar,
        uint256 amount,
        uint256 timestamp
    );

    constructor(
        string memory _title,
        string memory _category,
        string memory _description,
        string memory _image,
        uint256 _targetAmount,
        uint256 _targetTimestamp
    ) {
        // TODO: Check if category exists in Category Contract
        title = _title;
        category = _category;
        description = _description;
        image = _image;
        targetAmount = _targetAmount;
        targetTimestamp = _targetTimestamp;
        owner = msg.sender;
    }

    function donate(uint256 amount) public payable {
        // TODO: Check if contract is within deadline
        // TODO: Check if total recieved amount is less than targetAmount
        donaters[msg.sender] += amount;

        emit FundDonated(address(this), msg.sender, amount, block.timestamp);
    }
}
