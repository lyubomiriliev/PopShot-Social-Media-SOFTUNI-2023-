import "../../assets/styles/navBar.scss";
import Path from "../../paths";

import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from "../../contexts/AuthConext";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';





export default function NavBar() {


    const navigate = useNavigate();
    const { user, logOut } = UserAuth();

    const signOutUser = async () => {
        try {
            await logOut()
            navigate(Path.Login)
        } catch (e) {
            console.log(e.message);
        }

    }

    return (
        <div className="navBar">
            <div className="left">
                <Link to={Path.Home}>
                    <img src="../../src/assets/images/popshot-logo.png" alt="" />
                </Link>
                <div className="homeIcon">
                    <Link to={Path.Home}>
                        <HomeOutlinedIcon />
                    </Link>
                </div>
                <div className="gridIcon">
                    <GridViewOutlinedIcon />
                </div>
            </div>
            <div className="right">
                <div className="notifications">
                    <Link to="/notifications" style={{ textDecoration: "none", color: "inherit" }}>
                        <NotificationsNoneOutlinedIcon />
                    </Link>
                </div>
                <div className="logout">
                    <button onClick={signOutUser} >
                        <Link to={Path.Login} style={{ textDecoration: "none", color: "inherit" }}>
                            <ExitToAppOutlinedIcon />
                        </Link>
                    </button>
                </div>
                <div className="user">
                    {user && (
                        <>
                            <Link to={Path.MyProfile}>
                                <img src={user?.photoURL ?? ""} alt="profilePic" />
                            </Link>
                            <span>{user?.displayName}</span>
                        </>
                    )}
                </div>
            </div>
        </div>

    );
}