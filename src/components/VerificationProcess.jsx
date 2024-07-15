import { useState, useEffect } from "react";
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "@anon-aadhaar/react";

function VerificationProcess({ startVerification }) {
  const [isLoading, setIsLoading] = useState(false);
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  const handleVerification = async () => {
    setIsLoading(true);
    try {
      await startVerification();
    } catch (error) {
      console.error("Verification failed:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="verification-process">
      <h2>Aadhaar Verification</h2>
      <div>
        <LogInWithAnonAadhaar
          nullifierSeed={22418512023313350206149252188115262810613380}
        />
        <p>{anonAadhaar?.status}</p>
      </div>
      <div>
        {/* Render the proof if generated and valid */}
        {anonAadhaar?.status === "logged-in" && (
          <>
            <p>✅ Proof is valid</p>
            <AnonAadhaarProof
              code={JSON.stringify(anonAadhaar.anonAadhaarProof, null, 2)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default VerificationProcess;
