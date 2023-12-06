import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';
import "../../assets/styles/register.scss";

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from "../../config/firebase";


export default function Register() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const auth = getAuth(app);

    const signUpHandler = () => {

        createUserWithEmailAndPassword(auth, email, password, username)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Account create successful")
                navigate('/login')
            })
            .catch((error) => {
                const errorCode = error.code;
                alert(errorCode);
            });

    }
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>POP A SHOT.</h1>
                    <p>Join Popshot and be part of a vibrant social community where your photos come to life. Share, connect, and capture memories effortlessly.</p>
                    <span>Already registered?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form >
                        <input name="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </form>
                    <button onClick={signUpHandler} >Register</button>
                </div>
            </div>
        </div>
    )
}