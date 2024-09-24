import "../../assets/styles/navBar.scss";
import Path from "../../paths";

import { Link } from 'react-router-dom';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import useLogout from "../../hooks/useLogout";
import useAuthStore from "../../store/authStore";


export default function NavBar() {

    const { handleUserLogout } = useLogout();

    const authUser = useAuthStore(state => state.user);

    if (!authUser) return null;


    return (
        <div className="navBar">
            <div className="left">
                <Link to={Path.Home} style={{ textDecoration: "none", color: "inherit" }}>
                    <img src="../../src/assets/images/popshot-logo.png" alt="" />
                </Link>
                <div className="homeIcon">
                    <Link to={Path.Home} style={{ textDecoration: "none", color: "inherit" }}>
                        <HomeOutlinedIcon />
                    </Link>
                </div>
            </div>
            <div className="right">
                <div className="user">
                    {authUser && (
                        <>
                            <Link to={`/${authUser.username}`}>
                                <img src={authUser.profilePicURL} alt="profilePic" />
                            </Link>
                            <Link to={`/${authUser.username}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span>{authUser.fullName}</span>
                            </Link>
                        </>
                    )}
                </div>
                <div className="logout">
                    <button onClick={handleUserLogout} >
                        <ExitToAppOutlinedIcon />
                    </button>
                </div>
            </div>
        </div>

    );
}