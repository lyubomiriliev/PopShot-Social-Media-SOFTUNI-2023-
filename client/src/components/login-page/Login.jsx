import '../../assets/styles/login.scss';
import { auth, provider } from '../../config/firebase';
import { signInWithPopup } from 'firebase/auth'

import { Link, useNavigate } from "react-router-dom"

export default function Login() {

    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider)
        navigate('/');
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
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                    </form>
                    <button>Login</button>
                    <button onClick={signInWithGoogle} >Sign in with Google</button>

                </div>
            </div>
        </div>
    )
}