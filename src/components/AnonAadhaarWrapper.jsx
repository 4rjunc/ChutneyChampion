import { AnonAadhaarProvider } from "@anon-aadhaar/react"; // Assuming this is the correct import

function AnonAadhaarWrapper({ children }) {
  return <AnonAadhaarProvider>{children}</AnonAadhaarProvider>;
}

export default AnonAadhaarWrapper;
