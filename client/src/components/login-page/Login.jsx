import '../../assets/styles/login.scss';
import { auth, provider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        navigate('/');
    }

    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert('Log in successful');
                navigate('/');

            })
            .catch((error) => {
                const errorCode = error.code;
                alert(errorCode);
            });

    }

    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Welcome to Popshot !</h1>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quisquam id laboriosam tempora quia harum magni ipsum sequi, corrupti voluptatem.</p>
                    <span>You dont have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <form >
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    </form>
                    <button onClick={signIn}>Login</button>
                    <button onClick={signInWithGoogle} >Sign in with Google</button>

                </div>
            </div>
        </div>
    )
}