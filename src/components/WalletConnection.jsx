function WalletConnection({ walletAddress, connectWallet, disconnectWallet }) {
  return (
    <div>
      {walletAddress ? (
        <div>
          <p className="p-3 bg-info bg-opacity-10 border border-info  rounded">
            Connected Wallet: {walletAddress}
          </p>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default WalletConnection;
