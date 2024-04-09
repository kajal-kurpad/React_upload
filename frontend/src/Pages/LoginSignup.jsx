import React, { useState } from "react";
import './CSS/LoginSignup.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        name: "",
        password: "",
        email: ""
    });
    const [alertMessage, setAlertMessage] = useState("");
    const [isChecked, setIsChecked] = useState(false);

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const login = async () => {
        console.log("Login Function Executed.", formData);
        let responseData;
        await fetch('http://localhost:4000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors)
        }
    };

    const signup = async () => {
        console.log("Signup Function Executed.", formData);
        let responseData;
        await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace("/");
        } else {
            alert(responseData.errors)
        }
    };

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const handleContinue = () => {
        if (!isChecked) {
            alert("Please agree to the terms of use & privacy policy.");
        } else {
            state === "Login" ? login() : signup();
        }
    };

    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign Up" ? <input type="text" name="name" value={formData.name} onChange={changeHandler} placeholder="Your Name" /> : <></>}
                    <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Email Address" />
                    <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password" />
                </div>
                <button onClick={handleContinue} >Continue</button>
                {alertMessage && <p className="alert-message">{alertMessage}</p>}
                {state === "Sign Up"
                    ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login</span> </p> :
                    <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }} >Click here</span> </p>
                }
                <div className="loginsignup-agree">
                    <input type="checkbox" name="agree" id="agreeCheckbox" checked={isChecked} onChange={handleCheckboxChange} />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
