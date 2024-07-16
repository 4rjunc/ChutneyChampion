import { useState, useEffect } from "react";
import {
  LogInWithAnonAadhaar,
  useAnonAadhaar,
  AnonAadhaarProof,
} from "@anon-aadhaar/react";

function VerificationProcess() {
  const [anonAadhaar] = useAnonAadhaar();

  useEffect(() => {
    console.log("Anon Aadhaar status: ", anonAadhaar.status);
  }, [anonAadhaar]);

  return (
    <div>
      <h2>Aadhaar Verification</h2>
      <div>
        <LogInWithAnonAadhaar nullifierSeed={1234} />
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
