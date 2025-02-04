import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/auth"; // Backend URL

function App() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);

  const sendOtp = async () => {
    await axios.post(`${API_URL}/send-otp`, { email });
    setStep(2);
  };

  const verifyOtp = async () => {
    const response = await axios.post(`${API_URL}/verify-otp`, { email, otp });
    if (response.data.verified) {
      alert("OTP Verified!");
    } else {
      alert("Invalid OTP!");
    }
  };

  return (
    <div>
      {step === 1 ? (
        <div>
          <h2>Enter Email</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <h2>Enter OTP</h2>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
}

export default App;
