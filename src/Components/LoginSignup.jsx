import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/LoginSignup.css'
import { useLoginDataProvider } from "../Components/LoginProvider"
import PhoneInput from 'react-phone-number-input'
import { FaEye, FaRegEyeSlash } from 'react-icons/fa'
import 'react-phone-number-input/style.css'

const LoginSignup = () => {
    const { API, setToken, setUser, setForm } = useLoginDataProvider()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");

    // State for login form data
    const [loginFormData, setLoginFormData] = useState({
        username: '',
        password_hash: '',
    });

    // State for signup form data
    const [signupFormData, setSignupFormData] = useState({
        name: '',
        username: '',
        password_hash: '',
        email: '',
        phone_number: '',
    });

    // Event handler for login form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setLoginFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Event handler for signup form input change
    const handleChange = (e) => {
        const { id, value } = e.target

        if (id === "phone_number") {
            setSignupFormData(prevState => ({
                ...prevState,
                phone_number: value
            }))
        } else {
            setSignupFormData(prevState => ({
                ...prevState,
                [id]: value
            }))
        }
    }

    // Event handler for login form submission

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API}/users/login`, {
                method: "POST",
                body: JSON.stringify(loginFormData),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (response.ok && data.token && data.user.user_id) {
                const { user, token } = data;
                setUser(user);
                setToken(token);
                setForm(loginFormData);
                setLoginFormData({
                    username: '',
                    password_hash: ''
                });
                navigate(`/users/home`);
            } else {
                // toast.error("Login failed: " + data.error, { autoClose: 4000, position: "top-center" });
                alert("Login failed: " + data.error);
                console.log("Login failed:", data);
                throw new Error(data.error);
            }

        } catch (err) {
            setError(err.message);
            console.log("error:", err);
        } finally {
            setLoading(false);
        }
    };

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     fetch(`${API}/users/login`, {
    //         method: "POST",
    //         body: JSON.stringify(loginFormData),
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(res => {
    //             if (res.token && res.user.user_id) {
    //                 const { user, token } = res;
    //                 setUser(user);
    //                 setToken(token);
    //                 setForm(loginFormData);
    //                 setLoginFormData({
    //                     username: '',
    //                     password_hash: ''
    //                 });
    //                 navigate(`/users/home`);
    //             } else {
    //                 toast.error("Login failed: " + res.error, { autoClose: 3000 })
    //                 console.log("Login failed:", res);
    //             }
    //         })
    //         .catch(err => console.error("Login error:", err));
    // };

    // Event handler for signup form submission

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(API, signupFormData)

        fetch(`${API}/users/sign-up`, {
            method: "POST",
            body: JSON.stringify(signupFormData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(error => {
                        throw new Error(error.error); // Throw the error message received from the server
                    });
                }
                return res.json();
            })
            .then(res => {
                if (res.user) {
                    console.log("User created successfully:", res.user);
                    const { user, token } = res;
                    setUser(user);
                    setToken(token);
                    setSignupFormData(signupFormData);
                    setSignupFormData({
                        name: '',
                        username: '',
                        password_hash: '',
                        email: '',
                        phone_number: ''
                    })
                    navigate(`/users/sign-up/${user.user_id}/contacts`);
                } else {
                    console.log("Failed to create user:", res);
                }
            })
            .catch(err => {
                toast.error(err.message, { autoClose: 3000 })
                console.error("Error creating user:", err);

            });
    }

    if (loading) {
        return (<div className="Loading"><img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c4954169321565.5b7d0cbe74d11.gif" alt="loading" style={{ width: '400px', height: '400px', borderRadius: '80px' }} />{" "}</div>)
    } else {
        return (
            <div className='loginSignUp'>
                <ToastContainer className="toastify" />
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
                <div className="section">
                    <div className="container">
                        <div className="row full-height justify-content-center">
                            <div className="col-12 text-center align-self-center py-5">
                                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                    <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                    <label htmlFor="reg-log"></label>
                                    <div className="card-3d-wrap mx-auto">
                                        <div className="card-3d-wrapper">
                                            <div className="card-front">
                                                <div className="center-wrap">
                                                    <div className="section text-center">
                                                        <h4 className="mb-4 pb-3">Log In</h4>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-style"
                                                                placeholder="Username"
                                                                name="username"
                                                                value={loginFormData.username}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                            <i className="input-icon uil uil-phone"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                className="form-style"
                                                                placeholder="Password"
                                                                name="password_hash"
                                                                value={loginFormData.password_hash}
                                                                onChange={handleInputChange}
                                                                required
                                                            />
                                                            {showPassword ? (
                                                                <FaEye className="eye-icon" onClick={() => setShowPassword(false)} />
                                                            ) : (
                                                                <FaRegEyeSlash className="eye-icon" onClick={() => setShowPassword(true)} />
                                                            )}
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button onClick={handleLogin} className="btn mt-4">Login</button>
                                                        <p className="mb-0 mt-4 text-center">
                                                            <Link to="/forgot-password" className="link">Forgot your password?</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-back">
                                                <div className="center-wrap">
                                                    <div className="section text-center">
                                                        <h4 className="mb-3 pb-3">Sign Up</h4>
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-style"
                                                                placeholder="Full Name"
                                                                id="name"
                                                                value={signupFormData.name}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="text"
                                                                className="form-style"
                                                                placeholder="Username"
                                                                id="username"
                                                                value={signupFormData.username}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type={showPassword ? "text" : "password"}
                                                                className="form-style"
                                                                placeholder="Password"
                                                                id="password_hash"
                                                                value={signupFormData.password_hash}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            {showPassword ? (
                                                                <FaEye className="eye-icon" onClick={() => setShowPassword(false)} />
                                                            ) : (
                                                                <FaRegEyeSlash className="eye-icon" onClick={() => setShowPassword(true)} />
                                                            )}
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input
                                                                type="email"
                                                                className="form-style"
                                                                placeholder="Email"
                                                                id="email"
                                                                value={signupFormData.email}
                                                                onChange={handleChange}
                                                                required
                                                            />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <PhoneInput
                                                                type="tel"
                                                                className="form-style smaller-input"
                                                                placeholder="Phone Number"
                                                                id="phone_number"
                                                                value={signupFormData.phone_number}
                                                                defaultCountry="US"
                                                                onChange={(value) => setSignupFormData({ ...signupFormData, phone_number: value })}
                                                                required

                                                            />
                                                            <i className="input-icon uil uil-phone"></i>
                                                        </div>
                                                        <button onClick={handleSubmit} className="btn mt-4">Sign Up</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

export default LoginSignup;
