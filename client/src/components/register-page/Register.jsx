import { Link } from "react-router-dom"
import { useState } from 'react';
import '../../assets/styles/register.scss';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { app } from "../../config/firebase";


export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const auth = getAuth(app);



    const signUpHandler = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                alert("Account create successful")
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
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio quisquam id laboriosam tempora quia harum magni ipsum sequi, corrupti voluptatem.</p>
                    <Link to="/login">
                        <span>Already registered?</span>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form >
                        <input name="username" type="text" placeholder="Username" />
                        <input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <input name="name" type="text" placeholder="Name" />
                    </form>
                    <button onClick={signUpHandler} >Register</button>
                </div>
            </div>
        </div>
    )
}