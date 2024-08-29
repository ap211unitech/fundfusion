// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Campaign.sol";

contract FundFusion {
    mapping(address => address[]) deployedCampaigns;
    address[] allDeployedCampaigns;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    event NewCampaignCreated(
        address indexed creator,
        address indexed campaign,
        uint256 timestamp
    );

    function createCampaign(
        string memory _title,
        string memory _category,
        string memory _description,
        string memory _image,
        uint256 _targetAmount,
        uint256 _targetTimestamp,
        address _categoryContractAddress
    ) public {
        Campaign campaign = new Campaign(
            _title,
            _category,
            _description,
            _image,
            _targetAmount,
            _targetTimestamp,
            _categoryContractAddress
        );

        address campaignAddress = address(campaign);
        deployedCampaigns[msg.sender].push(campaignAddress);
        allDeployedCampaigns.push(campaignAddress);

        emit NewCampaignCreated(msg.sender, campaignAddress, block.timestamp);
    }

    function getAllDeployedCampaigns() public view returns (address[] memory) {
        return allDeployedCampaigns;
    }

    function getDeployedCampaigns(
        address campaignCreator
    ) public view returns (address[] memory) {
        return deployedCampaigns[campaignCreator];
    }
}
