import { useAuthState } from "react-firebase-hooks/auth";
import "../../assets/styles/settings.scss";
import { auth } from "../../config/firebase";
import NavBar from "../navbar-components/NavBar";
import LeftBar from "../navbar-components/LeftBar";

export default function Settings() {

    const [user] = useAuthState(auth);

    return (
        <>
            <div >
                <NavBar />
                <div className="leftBarDiv" style={{ display: "flex" }}>
                    <LeftBar />
                    <div className="settingsContainer" style={{ flex: 6 }}>
                        <div className="innerContainer">
                            <div className="header">
                                <h1> Profile Settings </h1>
                            </div>
                            <div className="userHead">
                                <img src={user?.photoURL} alt="profilePic" />
                                <h2>{user.displayName}</h2>
                            </div>
                            <div className="inputMain">
                                <input type="text" placeholder="Full Name" />
                                <input type="email" placeholder="Email" />
                                <input type="password" placeholder="Password" />
                                <input type="date" placeholder="Birthday" />
                            </div>
                            <div className="submitBtns">
                                <button>Save Changes</button>
                                <button>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}