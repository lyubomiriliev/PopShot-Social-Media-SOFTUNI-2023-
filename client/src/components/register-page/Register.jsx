import { Link } from "react-router-dom"

export default function Register() {
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
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <input type="text" placeholder="Name" />
                    </form>
                    <button>Register</button>
                </div>
            </div>
        </div>
    )
}