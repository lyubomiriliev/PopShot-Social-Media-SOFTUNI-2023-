import "../../assets/styles/register.scss";
import Path from "../../paths";
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';

import { UserAuth } from "../../contexts/AuthConext";

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';

export default function Register() {



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [error, setError] = useState("")
    const { createUser } = UserAuth();
    const navigate = useNavigate();


    const RegisterSubmit = async () => {
        setError('')
        try {
            await createUser(email, password)
            navigate('/')
        } catch (e) {
            setError(e.message)
            console.log(e.message);
        }
    }

    const registerValidation = yup.object().shape({
        username: yup.string().required("You need a valid username to register."),
        email: yup.string().required("You need an email to register."),
        password: yup.string().required("You need a password to register."),
    });

    const { register, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(registerValidation),
    })
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
                    <form onSubmit={handleSubmit(RegisterSubmit)} >
                        <input name="username" type="text" placeholder="Username" {...register("username")} onChange={(e) => setUsername(e.target.value)} />
                        <p style={{ color: "red", fontSize: "13px", marginTop: "-15px" }}> {errors.username?.message} </p>
                        <input name="email" type="email" placeholder="Email" {...register("email")} onChange={(e) => setEmail(e.target.value)} />
                        <p style={{ color: "red", fontSize: "13px", marginTop: "-15px" }}> {errors.email?.message} </p>
                        <input name="password" type="password" placeholder="Password" {...register("password")} onChange={(e) => setPassword(e.target.value)} />
                        <p style={{ color: "red", fontSize: "13px", marginTop: "-15px" }}> {errors.password?.message} </p>
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}