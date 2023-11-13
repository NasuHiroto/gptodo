import React, { useState } from "react";
import axios from "axios";

function PasswordReset() {
    const [email, setEmail] = useState("");
    const [resetStatus, setResetStatus] = useState(null);
    const [error, setError] = useState(null); // エラーメッセージのステート

    const handleReset = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/password/reset", { email });
            setResetStatus(response.data.message);
        } catch (error) {
            console.error(error);
            setError("Password reset failed.");
        }
    };

    return (
        <div>
            <h2>Forgot Password?</h2>
            <form onSubmit={handleReset}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button type="submit">Reset Password</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            {resetStatus && <p>{resetStatus}</p>}
        </div>
    );
}

export default PasswordReset;
