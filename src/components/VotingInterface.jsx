import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const contractABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "voter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "foodItemId",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "foodItems",
    outputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllFoodItems",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "voteCount",
            type: "uint256",
          },
        ],
        internalType: "struct FoodVoting.FoodItem[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_foodItemId",
        type: "uint256",
      },
    ],
    name: "getFoodItem",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFoodItemCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_foodItemId",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
]; // Add your updated contract ABI here after deploying

const contractAddress = "0xDd8cb59289bF7e324a37F74f8abB16D9F133cb2e"; // Add your contract address here after deploying

function FoodVotingInterface({ walletAddress }) {
  const [contract, setContract] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      initializeContract();
    }
  }, [walletAddress]);

  const initializeContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const votingContract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer,
    );
    setContract(votingContract);

    await loadFoodItems(votingContract);
    await checkVotingStatus(votingContract);
  };

  const loadFoodItems = async (votingContract) => {
    try {
      const items = await votingContract.getAllFoodItems();
      const formattedItems = items.map((item, index) => ({
        id: index,
        name: item.name,
        voteCount: item.voteCount.toNumber(),
      }));
      setFoodItems(formattedItems);
    } catch (error) {
      console.error("Error loading food items:", error);
    }
  };

  const checkVotingStatus = async (votingContract) => {
    const voted = await votingContract.hasVoted(walletAddress);
    setHasVoted(voted);
  };

  const handleVote = async (foodItemId) => {
    if (!contract) return;
    setIsLoading(true);

    try {
      const tx = await contract.vote(foodItemId);
      await tx.wait();
      setHasVoted(true);
      await loadFoodItems(contract);
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!walletAddress) {
    return <p>Please connect your wallet to vote.</p>;
  }

  return (
    <div className="food-voting-interface">
      <h2 className="text-center">Vote for Your Favorite Indian Dish</h2>
      <div className="food-items">
        {foodItems.map((item) => (
          <div key={item.id} className="food-item">
            <h3>{item.name}</h3>
            <p>Votes: {item.voteCount}</p>
            {!hasVoted && (
              <button onClick={() => handleVote(item.id)} disabled={isLoading}>
                {isLoading ? "Voting..." : "Vote"}
              </button>
            )}
          </div>
        ))}
      </div>
      {hasVoted && <p className="text-center fs-3">Thank you for voting!</p>}
    </div>
  );
}

export default FoodVotingInterface;
