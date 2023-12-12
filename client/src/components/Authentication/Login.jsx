import "../../assets/styles/login.scss";
import Path from '../../paths';
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';

import { auth, provider } from '../../config/firebase';
import { UserAuth } from '../../contexts/AuthConext';

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';


export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn, google, user, createUserDoc } = UserAuth();

    const LoginSubmit = async () => {
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
        const result = await google(auth, provider)
        navigate(Path.Home);
    }

    const loginValidation = yup.object().shape({
        email: yup.string().required("You need an email to log in."),
        password: yup.string().required("You need a password to log in."),
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(loginValidation),
    })

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
                    <form onSubmit={handleSubmit(LoginSubmit)} >
                        <input type="email" placeholder="Email" {...register("email")} onChange={(e) => setEmail(e.target.value)} />
                        <p style={{ color: "red", fontSize: "13px", marginTop: "-15px" }}> {errors.email?.message} </p>
                        <input type="password" placeholder="Password" {...register("password")} onChange={(e) => setPassword(e.target.value)} />
                        <p style={{ color: "red", fontSize: "13px", marginTop: "-15px" }}> {errors.password?.message} </p>
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