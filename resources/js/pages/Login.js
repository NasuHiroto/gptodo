import React, { useState, useEffect } from "react";
import axios from "axios";
import PasswordReset from "./PasswordReset";
import RegistrationForm from "./RegistrationForm";
import { Redirect } from "react-router-dom"; // React Routerを使用してリダイレクト

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [resetVisible, setResetVisible] = useState(false);
    const [registerVisible, setRegisterVisible] = useState(false);
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false); // ログイン状態

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            setError("Please fill in both email and password.");
            return;
        }

        try {
            const response = await axios.post("/login", formData);
            console.log(response.data);
            // ログインに成功した場合の処理
            setLoggedIn(true);
        } catch (error) {
            console.error(error);
            setError("Login failed. Please check your credentials.");
        }
    };

    const toggleResetForm = () => {
        setResetVisible(true);
        setRegisterVisible(false);
    };

    const toggleRegisterForm = () => {
        setRegisterVisible(true);
        setResetVisible(false);
    };

    useEffect(() => {
        if (window.location.hash === "#register") {
            setRegisterVisible(true);
        }
    }, []);

    if (loggedIn) {
        return <Redirect to="/home"/>; // ログインに成功したらリダイレクト
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
            <p>
                <a href="#reset" onClick={toggleResetForm}>
                    Forgot your password?
                </a>
            </p>
            <p>
                <a href="#register" onClick={toggleRegisterForm}>
                    Register
                </a>
            </p>
            {resetVisible && <PasswordReset />}
            {registerVisible && <RegistrationForm />}
        </div>
    );
}

export default Login;
