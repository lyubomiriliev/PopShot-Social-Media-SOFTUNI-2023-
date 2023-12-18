import "../../assets/styles/register.scss";
import Path from "../../paths";
import { Link } from "react-router-dom"
import { useState } from 'react';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword";

export default function Register() {

    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const { signup } = useSignUpWithEmailAndPassword();

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
                    <div className="inputForm">
                        <input name="fullName" type="text" placeholder="Full Name" value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />

                        <input name="username" type="text" placeholder="Username" value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />

                        <input name="email" type="email" placeholder="Email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                        <div className="showPassword">
                            <input name="password" type={showPassword ? "text" : "password"} placeholder="Password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                            <button className="showBtn" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                            </button>
                        </div>

                    </div>
                    <div className="actionButtonsRegister">
                        <button onClick={() => signup(inputs)}>Register</button>
                    </div>

                </div>
            </div>
        </div>
    )
}