import "../../assets/styles/register.scss";
import Path from "../../paths";
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';

import { UserAuth } from "../../contexts/AuthConext";

export default function Register() {



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const createUser = UserAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await createUser(email, password)
            navigate('/')
        } catch (e) {
            setError(e.message)
            console.log(e.message);
        }
    }
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>POP A SHOT.</h1>
                    <p>Join Popshot and be part of a vibrant social community where your photos come to life. Share, connect, and capture memories effortlessly.</p>
                    <span>Already registered?</span>
                    <Link to={Path.Login}>
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} >
                        <input name="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                        <input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}