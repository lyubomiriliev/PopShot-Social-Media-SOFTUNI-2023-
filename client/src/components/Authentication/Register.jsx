import "../../assets/styles/register.scss";
import Path from "../../paths";
import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react';

import { UserAuth } from "../../contexts/AuthConext";

import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function Register() {



    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const { SignUp, createUserDoc } = UserAuth();

    const navigate = useNavigate();


    const RegisterSubmit = async () => {
        try {
            const response = await SignUp(inputs.email, inputs.password)
            console.log(response)
            createUserDoc(response.user.email,)
            navigate(Path.Home)
        } catch (err) {
            console.log(err);
        }
    }

    const registerValidation = yup.object().shape({
        fullName: yup.string().required("You need a name to register."),
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
                        <input name="fullName" type="text" placeholder="Full Name" {...register("fullName")} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
                        <p style={{ color: "red", fontSize: "13px", marginTop: "-15px" }}> {errors.fullName?.message} </p>

                        <input name="username" type="text" placeholder="Username" {...register("username")} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
                        <p style={{ color: "red", fontSize: "13px", marginTop: "-15px" }}> {errors.username?.message} </p>

                        <input name="email" type="email" placeholder="Email" {...register("email")} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                        <p style={{ color: "red", fontSize: "13px", marginTop: "-15px" }}> {errors.email?.message} </p>

                        <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" {...register("password")} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                        <p style={{ color: "red", fontSize: "13px", marginTop: "-15px" }}> {errors.password?.message} </p>

                        <button>Register</button>
                    </form>
                    <button onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}

                    </button>
                </div>
            </div>
        </div>
    )
}