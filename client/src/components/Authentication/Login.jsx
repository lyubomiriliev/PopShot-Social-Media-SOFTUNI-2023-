import "../../assets/styles/login.scss";
import Path from '../../paths';
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';

import useLogin from "../../hooks/useLogin";
import useAuthStore from "../../store/authStore";

import { auth, db } from '../../config/firebase';
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { googleSVG, popshotWhite } from "../../assets/images";


export default function Login() {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    const { handleUserLogin } = useLogin()
    const navigate = useNavigate();

    const [signInWithGoogle, user, error] = useSignInWithGoogle(auth);
    const loginUser = useAuthStore((state) => state.login);

    const googleSignIn = async () => {
        try {
            const newUser = await signInWithGoogle()
            if (!newUser) {
                console.log(error)
                return
            }

            const userRef = doc(db, "users", newUser.user.uid);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {

                const userDoc = userSnapshot.data();
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);

            } else {
                const userDoc = {
                    uid: newUser.user.uid,
                    email: newUser.user.email,
                    username: newUser.user.email.split("@")[0],
                    fullName: newUser.user.displayName,
                    bio: "",
                    profilePicURL: newUser.user.photoURL,
                    followers: [],
                    following: [],
                    posts: [],
                    createdAt: Date.now(),
                };
                await setDoc(doc(db, "users", newUser.user.uid), userDoc);
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(userDoc);
                navigate(Path.Home);
            }

        } catch (error) {
            console.log(error)
        }

        navigate(Path.Home);
    }
    return (
        <div className="login">
            <div className="card">
                <div className="left">
                    <h1>Welcome to Popshot !</h1>
                    <p>Where every shot tells a story and spreads happiness! Get ready to paint the world with your picture-perfect experiences!</p>
                    <img className="logo" src={popshotWhite} alt="Popshot Logo" />
                </div>
                <div className="right">
                    <h1>Login</h1>
                    <h2>Login</h2>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleUserLogin(inputs);
                    }}>
                        <input type="email" placeholder="Email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                        <input type="password" placeholder="Password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                        <div className="actionBtnsLogin">
                            <button type="submit">Sign In</button>
                            <div className="forgotPW">
                                <p>Forgot Password?</p>
                            </div>
                            <div className="google">
                                <img className="googleLogo" src={googleSVG} alt="Google Logo" />
                                <span onClick={googleSignIn} >Google Sign In</span>
                            </div>
                        </div>
                    </form>
                    <Link className="link" to="/register">
                        <div className="notRegistered">
                            <span>You dont have an account?</span>
                            <button>Register</button>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    )
}