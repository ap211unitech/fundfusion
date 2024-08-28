// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./FundFusion.sol";

contract Category {
    FundFusion fundFusion;

    address public owner;
    string[] public categories;

    event CreatedCategory(address owner, uint256 categoryId, string name);
    event EditCategory(address owner, uint256 categoryId, string name);

    constructor() {
        owner = fundFusion.owner();
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner allowed !!");
        _;
    }

    function createCategory(string memory _category) public onlyOwner {
        categories.push(_category);

        emit CreatedCategory(owner, categories.length - 1, _category);
    }

    function editCategory(
        uint256 _categoryId,
        string memory _category
    ) public onlyOwner {
        require(_categoryId < categories.length, "Out of bound !!");

        categories[_categoryId] = _category;

        emit EditCategory(owner, _categoryId, _category);
    }
}
