// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Category {
    address public owner;
    string[] public categories;

    event CreatedCategory(address owner, uint256 categoryId, string name);
    event EditCategory(address owner, uint256 categoryId, string name);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only owner allowed !!");
        _;
    }

    function getCategories() public view returns (string[] memory) {
        return categories;
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
