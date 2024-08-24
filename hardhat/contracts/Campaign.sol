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
    bool public fundWithdrawanByOwner;
    bool public fundRefundedToContributors;

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
        require(
            _targetTimestamp > block.timestamp,
            "Target timestamp must be greater than current time !!"
        );

        // TODO: Check if category exists in Category Contract
        title = _title;
        category = _category;
        description = _description;
        image = _image;
        targetAmount = _targetAmount;
        targetTimestamp = _targetTimestamp;
        owner = msg.sender;
        fundWithdrawanByOwner = false;
        fundRefundedToContributors = false;
    }

    function donate() public payable {
        // Check if contract is within deadline
        require(
            targetTimestamp >= block.timestamp,
            "Campaign is no longer valid. Deadline passed now !!"
        );

        // Check if funds are not withdrawan already
        require(
            !fundWithdrawanByOwner,
            "Can not donate to this campaign as funds are already withdrawan by owner !!"
        );

        // Check if funds are refunded to contributors
        require(
            !fundRefundedToContributors,
            "Can not donate to this campaign as funds are already refunded to contributors !!"
        );

        // Check if total recieved amount is less than targetAmount
        require(
            address(this).balance < targetAmount,
            "Target amount already met !!"
        );

        uint256 amount = msg.value;
        donaters[msg.sender] += amount;

        emit FundDonated(address(this), msg.sender, amount, block.timestamp);
    }
}
