import "./login.css"
import { NavLink, useNavigate } from "react-router-dom"
import { useState, useCallback, useEffect } from "react"
import { UserApi } from "../../api/user"
import Alert from "../../components/Alert/Alert"
function Signinpage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const handleSubmit = useCallback( async () => {
        if (validate()) {
            setLoading(true)

            const {statusCode, data} = await UserApi.Login({
                email: email,
                password: password
            })

            setLoading(false)
            if (statusCode === 200) {
                navigate("/properties")
            } else {
                console.log(data)
                setAlert(data.error)
            }
        }

    }
        
    );

    const setErrorAndClear = (newError) => {
        setError(newError);
        setTimeout(() => {
            setError(false);
        }, 5000); // 5000 milliseconds = 5 seconds
    };

    useEffect(() => {
    }, [error]);

    const validate = () => {
        let isValid = true
        const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,}$/;
        const error = {
            email: "",
            password: "",
        }
        if (email === "") {
            error.email = "Email is required"
            isValid = false
        } else if (!email.includes("@") || !email.includes(".") || !emailRegex.test(email)) {
            error.email = "Email is invalid"
            isValid = false
        }
        if (password === "") {
            error.password = "Password is required"
            isValid = false
        }
        if (!isValid){
            setErrorAndClear(error)
        }
        return isValid
    }
    return (
        <>
            {alert && <Alert payload={alert} func= {setAlert} />}
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
                        
                        <div className="login-form">
                            <div className="form">
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input  type="email" 
                                            id="email" 
                                            name="email" 
                                            placeholder="Enter your email"
                                            onChange={(event) => setEmail(event.target.value)}></input>
                                    {error && <p className="error-message">{error.email}</p>}
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
                                    {error && <p className="error-message">{error.password}</p>}
                                </div>
                                <div className="form-gap"></div>
                                <button     className="button-1"
                                            onClick={handleSubmit} >Sign In</button>
                                <div className="login-link">
                                    <p>Dont have an account? <NavLink to="/signup">Sign Up</NavLink></p>
                                </div>
                            </div>
                        </div>
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

