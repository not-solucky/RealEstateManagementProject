import "./login.css"
import { useState } from "react"
import { NavLink } from "react-router-dom"
import { UserApi } from "../../api/user"

function Signuppage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [terms, setTerms] = useState(false)
    const [error, setError] = useState(Array(6).fill(null));
    const [status, setStatus] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (!validate()) {
            return
        }
        const {statusCode, data} = await UserApi.Register({
            username: name,
            email: email,
            password: password,
            phone: phone
        })
        console.log(statusCode)
        if (statusCode === 201) {

            setStatus("success")
        } else {
            setStatus("error")
            setMessage(data.error)
        }
        
    }
    const validate = () => {
        let error = Array(6).fill(null)
        let isValid = true
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^[0-9]+$/
        if (name === "") {
            error[0] = "Name is required"
            isValid = false
        }
        if (phone === "") {
            error[5] = "Phone is required"
            isValid = false
        } else if (phone.length != 11) {
            error[5] = "Invalid phone number"
            isValid = false
        } else if (!phoneRegex.test(phone)) {
            error[5] = "Invalid phone number"
            isValid = false
        }
        if (email === "") {
            error[1] = "Email is required"
            isValid = false
        } else if (!email.includes("@")) {
            error[1] = "Email is invalid"
            isValid = false
        } else if (!email.includes(".")) {
            error[1] = "Email is invalid"
            isValid = false
        } else if (!emailRegex.test(email)) {
            error[1] = "Email is invalid"
            isValid = false
        }
        if (password === "") {
            error[2] = "Password is required"
            isValid = false
        } else if (password.length < 8) {
            error[2] = "Password must be at least 8 characters"
            isValid = false
        }
        if (confirmPassword === "") {
            error[3] = "Confirm Password is required"
            isValid = false
        }
        if (confirmPassword !== password) {
            error[3] = "Passwords do not match"
            isValid = false
        }
        if (!terms) {
            error[4] = "You must agree to the terms of use and privacy policy"
            isValid = false
        }
        setError(error)
        return isValid
    }
    return (
        <>
            <section className="login-section">
                {status === "error" && (
                    <div className="error-container">
                        {message.length != 0 ? (
                            message
                        ) : (
                            "An error occured, please try again"
                        )}
                    </div>
                )}
                <div className="container">
                    <div className="image-content">
                        <img src="/pexels-samarth-1010079.jpg" alt="Building Image"></img>
                    </div>
                    <div className="login-content">
                        <div className="login-title">
                            <h2>Register Account</h2>
                            <p>Unlock exclusive access to our property listings, services, and resources by creating an account. Sign up today to begin your journey to finding the perfect property.</p>
                        </div>
                        {status === "success" ? (
                            <Status />
                        ) : (
                        <div className="login-form">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input  type="text" 
                                            id="name" name="name" 
                                            placeholder="Enter your name"
                                            onChange={(event) => setName(event.target.value)}></input>
                                    
                                    {error[0] && <p className="error-message">{error[0]}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input  type="email" 
                                            id="email" 
                                            name="email" 
                                            placeholder="Enter your email"
                                            onChange={(event) => setEmail(event.target.value)}></input>
                                    {error[1] && <p className="error-message">{error[1]}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone Number</label>
                                    <input  type="text" 
                                            id="phone" 
                                            name="phone" 
                                            placeholder="Enter your phone number"
                                            onChange={(event) => setPhone(event.target.value)}></input>
                                    {error[5] && <p className="error-message">{error[5]}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input  className="password" 
                                            type="password" 
                                            id="password" 
                                            name="password" 
                                            placeholder="Enter your password"
                                            onChange={(event) => {
                                                setPassword(event.target.value)
                                                if (confirmPassword !== "" && event.target.value !== confirmPassword) {
                                                    setError((prev) => {
                                                        return prev.map((item, index) => {
                                                            if (index === 3) {
                                                                return "Passwords do not match"
                                                            } else {
                                                                return item
                                                            }
                                                        })
                                                    })
                                                } else {
                                                    setError((prev) => {
                                                        return prev.map((item, index) => {
                                                            if (index === 3) {
                                                                return null
                                                            } else {
                                                                return item
                                                            }
                                                        })
                                                    })
                                                }
                                            }}></input>
                                    {error[2] && <p className="error-message">{error[2]}</p>}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirm-password">Confirm Password</label>
                                    <input  className="password" 
                                            type="password" 
                                            id="confirm-password" 
                                            name="confirm-password" 
                                            placeholder="Confirm your password"
                                            onChange={(event) => {
                                                setConfirmPassword(event.target.value)

                                                if (event.target.value !== password) {
                                                    setError((prev) => {
                                                        return prev.map((item, index) => {
                                                            if (index === 3) {
                                                                return "Passwords do not match"
                                                            } else {
                                                                return item
                                                            }
                                                        })
                                                    })
                                                } else {
                                                    setError((prev) => {
                                                        return prev.map((item, index) => {
                                                            if (index === 3) {
                                                                return null
                                                            } else {
                                                                return item
                                                            }
                                                        })
                                                    })
                                                }
                                            
                                            }}></input>
                                    {error[3] && <p className="error-message">{error[3]}</p>}
                                </div>
                                
                                <div className="check-group">
                                    <input  type="checkbox" 
                                            id="terms" 
                                            name="terms"
                                            onChange={(event) => setTerms(event.target.checked)}></input>
                                    <label htmlFor="terms">I agree to the Terms of Use and Privcy Policy</label>
                                    {error[4] && <p className="error-message">{error[4]}</p>}
                                </div>
                                <button     className="button-1"
                                            onClick={handleSubmit} >Sign Up</button>
                                <div className="login-link">
                                    <p>Already have an account? <NavLink to="/signin">Sign In</NavLink></p>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </section>
            
        </>
    );
}


function Status (props) {
    return (
        <> 
            <div className="success-container">
                <div className="title">
                    <h2>Account created successfully</h2>
                </div>
                <div className="login-container">
                    <p>Sign in to your account to continue</p>
                    <NavLink className="button-1" to={"/signin"}>Sign In</NavLink>
                </div>
            </div> 
        </>
    )
}

export default Signuppage;

