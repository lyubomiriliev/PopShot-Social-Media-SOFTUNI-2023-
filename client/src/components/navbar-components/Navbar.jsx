import '../../assets/styles/navBar.scss';

import { Link } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';



export default function NavBar() {

    const [user] = useAuthState(auth);

    return (
        <div className="navBar">
            <div className="left">
                <Link to="/">
                    <img src="../../public/images/popshot-logo.png" alt="" />
                </Link>
                <HomeOutlinedIcon />
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder='Search' />
                </div>
            </div>
            <div className="right">
                <NotificationsNoneOutlinedIcon />
                <Link to="/profile">
                    <PersonOutlineOutlinedIcon />
                </Link>
                <div className="user">
                    {user && (
                        <>
                            <img src={user?.photoURL ?? ""} alt="profilePic" />
                            <span>{user?.displayName}</span>
                        </>
                    )}
                </div>
            </div>
        </div>

    );
}