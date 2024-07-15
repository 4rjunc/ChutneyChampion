import { AnonAadhaarProvider } from "@anon-aadhaar/react"; // Assuming this is the correct import

function AnonAadhaarWrapper({ children }) {
  return (
    <AnonAadhaarProvider
      _useTestAadhaar={true}
    //_fetchArtifactsFromServer={false}
    >
      {children}
    </AnonAadhaarProvider>
  );
}

export default AnonAadhaarWrapper;
