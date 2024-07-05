import "./login.css"
import { useState,useContext } from "react"
import { NavLink } from "react-router-dom"
import {StoreContext} from "../../context/StoreContext"
import { Allapi } from "../../api/Api"
function Signinpage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(Array(2).fill(null));
    const [status, setStatus] = useState("")
    const [loginError, setLoginError] = useState("")
    const { setToken } = useContext(StoreContext);
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            try {
                const response = await Allapi.post(`/login`, {
                    email: email,
                    password: password,
                });

                // Extract token from response (assuming token is in the data property)
                const token = response.data.token;
                localStorage.setItem("nestnavigatortoken", token); // Store token in local storage
                setToken(token); // Update token in context
                console.log("Extracted token:", token);
                setStatus("success"); // Update status for success message

            } catch (error) {
                console.log("Login error:", error.response.data); // Handle errors
                setStatus("error"); // Update status for error message
                setLoginError(error.response.data.error);
            }
        }
    };
    const validate = () => {
        let isValid = true
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/;
        let error = Array(2).fill(null)
        
        if (email === "") {
            error[0] = "Email is required"
            isValid = false
        } else if (!email.includes("@")) {
            error[0] = "Email is invalid"
            isValid = false
        } else if (!email.includes(".")) {
            error[0] = "Email is invalid"
            isValid = false
        } else if (!emailRegex.test(email)) {
            error[0] = "Email is invalid"
            isValid = false
        }
        if (password === "") {
            error[1] = "Password is required"
            isValid = false
        }
        setError(error)
        return isValid
    }
    return (
        <>
            <section className="login-section">
                <div className="container">
                    <div className="image-content">
                        <img src="/pexels-samarth-1010079.jpg" alt="Building Image"></img>
                    </div>
                    <div className="login-content">
                        <div className="login-title">
                            <h2>Sign In</h2>
                            <p>Continue where you left off.</p>
                        </div>
                        {status === "success" ? (
                            <Status />
                        ) : (
                        <div className="login-form">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input  type="email" 
                                            id="email" 
                                            name="email" 
                                            placeholder="Enter your email"
                                            onChange={(event) => setEmail(event.target.value)}></input>
                                    {error[0] && <p className="error-message">{error[0]}</p>}
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
                                            }}></input>
                                    {error[1] && <p className="error-message">{error[1]}</p>}
                                </div>
                                <div className="form-gap"></div>
                                {status === "error" && <p className="error-message">{loginError}</p>}
                                <button     className="button-1"
                                            onClick={handleSubmit} >Sign In</button>
                                <div className="login-link">
                                    <p>Dont have an account? <NavLink to="/signup">Sign Up</NavLink></p>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>
            </section>
            
        </>
    );
}


function Status () {
    return (
        <> 
            <div className="success-container">
                <div className="title">
                    <h2>Signed In successfully</h2>
                </div>
                <div className="login-container">
                    <p>Welcome back! <br></br>
                    Browse a wide range of properties.</p>
                    <NavLink className="button-1" to={"/properties"}>Properties</NavLink>
                </div>
            </div> 
        </>
    )
}

export default Signinpage;

