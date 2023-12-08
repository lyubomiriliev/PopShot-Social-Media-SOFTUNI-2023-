import Path from '../../paths';
import "../../assets/styles/login.scss";
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';

import { auth, provider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth'
import { UserAuth } from '../../contexts/AuthConext';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn, google } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate(Path.Home)
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    };

    const googleSignIn = async () => {
        await google(auth, provider)
        navigate(Path.Home);
    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Welcome to Popshot !</h1>
                    <p>Where every shot tells a story and spreads happiness! Get ready to paint the world with your picture-perfect experiences!</p>
                    <span>You dont have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit} >
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <div className="right">
                            <button >Login</button>
                            <button onClick={googleSignIn} >Google Sign In</button>
                        </div>
                        <div className="forgotPW">
                            <p>Forgot Password?</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}