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
    CAMPAIGN_STATUS public status;
    uint256 public raisedAmount;

    enum CAMPAIGN_STATUS {
        ACTIVE,
        DELETED
    }

    mapping(address => uint256) public contributors;

    event FundDonated(
        address indexed campaign,
        address indexed contributor,
        uint256 amount,
        uint256 timestamp
    );

    event FundWithdrawanByOwner(
        address indexed campaign,
        address indexed owner,
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
        status = CAMPAIGN_STATUS.ACTIVE;
        fundWithdrawanByOwner = false;
        raisedAmount = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner allowed !!");
        _;
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

        // Check if campaign is active
        require(
            status == CAMPAIGN_STATUS.ACTIVE,
            "Can not donate to inactive campaign !!"
        );

        // Check if total raisedAmount is less than targetAmount
        require(raisedAmount < targetAmount, "Target amount already met !!");

        // Check if sender is not same as owner
        require(owner != msg.sender, "Owner can not donate !!");

        uint256 amount = msg.value;
        contributors[msg.sender] += amount;
        raisedAmount += amount;

        emit FundDonated(address(this), msg.sender, amount, block.timestamp);
    }

    function withdraw() public onlyOwner {
        // Check if deadline passed
        require(
            targetTimestamp < block.timestamp,
            "Can not withdraw Funds from active campaigns !!"
        );

        // Check if contract received targetAmount
        require(
            address(this).balance >= targetAmount,
            "Target amount not met !!"
        );

        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "Withdraw failed !!");
        fundWithdrawanByOwner = true;

        emit FundWithdrawanByOwner(
            address(this),
            msg.sender,
            address(this).balance,
            block.timestamp
        );
    }

    function editCampaign(
        string memory _title,
        string memory _category,
        string memory _description,
        string memory _image,
        uint256 _targetAmount
    ) public onlyOwner {
        // Campaign should be active
        require(
            status == CAMPAIGN_STATUS.ACTIVE,
            "Only active campaigns can be edited !!"
        );

        // Check if contract is within deadline
        require(
            targetTimestamp >= block.timestamp,
            "Campaign is no longer valid. Deadline passed now !!"
        );

        title = _title;
        category = _category;
        description = _description;
        image = _image;
        targetAmount = _targetAmount;
    }

    function deleteCampaign() public onlyOwner {
        // Campaign should be active
        require(
            status == CAMPAIGN_STATUS.ACTIVE,
            "Only active campaigns can be deleted !!"
        );

        // Check if contract is within deadline
        require(
            targetTimestamp >= block.timestamp,
            "Campaign is no longer valid. Deadline passed now !!"
        );

        status = CAMPAIGN_STATUS.DELETED;
    }
}
