import React, { useState } from "react";
import axios from "axios";

function RegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [registrationStatus, setRegistrationStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegistration = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            setError("Please fill in all fields.");
            setRegistrationStatus(null);
            return;
        }

        try {
            const response = await axios.post("/register", formData);
            setRegistrationStatus("Registration successful! Please login."); // Set the success message
            setError(null); // Clear any previous error
        } catch (error) {
            console.error(error);
            setError("Registration failed. Please check your information.");
            setRegistrationStatus(null);
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegistration}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {registrationStatus && <p style={{ color: 'green' }}>{registrationStatus}</p>}
            </form>
        </div>
    );
}

export default RegistrationForm;
