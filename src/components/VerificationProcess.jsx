import { useEffect } from "react";
import { useAnonAadhaar, LaunchProveModal } from "@anon-aadhaar/react";
import VotingInterface from "./VotingInterface";

const LaunchMode = ({ isTest, setIsTestMode, address }) => {
  return (
    <span onClick={() => setIsTestMode(isTest)}>
      <LaunchProveModal
        nullifierSeed={Math.floor(Math.random() * 1983248)}
        signal={address}
        buttonStyle={{
          borderRadius: "8px",
          border: "solid",
          borderWidth: "1.5px",
          boxShadow: "none",
          fontWeight: 500,
          borderColor: "#009A08",
          color: "#009A08",
        }}
        buttonTitle={isTest ? "USE TEST CREDENTIALS" : "USE REAL CREDENTIALS"}
        useTestAadhaar={isTest}
      />
    </span>
  );
};
function VerificationProcess({ walletAddress }) {
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <div className="w-100 mt-3 d-flex flex-column align-items-center">
      <h2>Aadhaar Verification</h2>
      <div className="d-flex gap-2">
        <LaunchMode
          isTest={false}
          setIsTestMode={false}
          address={walletAddress}
        />
        <LaunchMode
          isTest={true}
          setIsTestMode={true}
          address={walletAddress}
        />
      </div>
      <div>
        <p>{anonAadhaar?.status}</p>
      </div>
      <div>
        {/* Render the proof if generated and valid */}
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            <VotingInterface walletAddress={walletAddress} />
          </>
        )}
      </div>
    </div>
  );
}

export default VerificationProcess;
