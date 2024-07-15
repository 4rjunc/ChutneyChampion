import { useState } from "react";
import { ethers } from "ethers";

import AnonAadhaarWrapper from "./components/AnonAadhaarWrapper";
import WalletConnection from "./components/WalletConnection";
import VerificationProcess from "./components/VerificationProcess";

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log("signer: ", signer, "address: ", address);
        setWalletAddress(address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      console.error("Ethereum object not found, install MetaMask.");
    }
  };

  const disconnectWallet = async () => {
    if (window.ethereum) {
      try {
        // Clear the wallet address from the state
        setWalletAddress(null);

        // If using ethers.js v6 or later, you might need to clear the provider
        // provider.removeAllListeners();
        // provider = null;

        console.log("Wallet disconnected");

        // Note: MetaMask doesn't actually have a "disconnect" method
        // This function essentially just clears the app's state
      } catch (error) {
        console.error("Failed to disconnect wallet:", error);
      }
    } else {
      console.error("Ethereum object not found, install MetaMask.");
    }
  };
  return (
    <AnonAadhaarWrapper>
      <div className="App main">
        <h1>Aadhaar Verification DApp</h1>
        <WalletConnection
          walletAddress={walletAddress}
          disconnectWallet={disconnectWallet}
          connectWallet={connectWallet}
        />
        {walletAddress && <VerificationProcess />}
      </div>
    </AnonAadhaarWrapper>
  );
}

export default App;
