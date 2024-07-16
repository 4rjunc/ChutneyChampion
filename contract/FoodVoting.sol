// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FoodVoting {
    struct FoodItem {
        string name;
        uint256 voteCount;
    }

    FoodItem[] public foodItems;
    mapping(address => bool) public hasVoted;

    event Voted(address voter, uint256 foodItemId);

    constructor() {
        foodItems.push(FoodItem("Idly", 0));
        foodItems.push(FoodItem("Dosa", 0));
    }

    function vote(uint256 _foodItemId) public {
        require(_foodItemId < foodItems.length, "Invalid food item ID");
        require(!hasVoted[msg.sender], "You have already voted");

        foodItems[_foodItemId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(msg.sender, _foodItemId);
    }

    function getFoodItemCount() public view returns (uint256) {
        return foodItems.length;
    }

    function getFoodItem(uint256 _foodItemId) public view returns (string memory, uint256) {
        require(_foodItemId < foodItems.length, "Invalid food item ID");
        FoodItem memory item = foodItems[_foodItemId];
        return (item.name, item.voteCount);
    }

    function getAllFoodItems() public view returns (FoodItem[] memory) {
        return foodItems;
    }
}
