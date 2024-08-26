// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Campaign.sol";

contract FundFusion {
    mapping(address => address[]) deployedCampaigns;

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
        uint256 _targetTimestamp
    ) public {
        Campaign campaign = new Campaign(
            _title,
            _category,
            _description,
            _image,
            _targetAmount,
            _targetTimestamp
        );
        deployedCampaigns[msg.sender].push(address(campaign));

        emit NewCampaignCreated(msg.sender, address(campaign), block.timestamp);
    }

    function getDeployedCampaigns(
        address creator
    ) public view returns (address[] memory) {
        return deployedCampaigns[creator];
    }
}
