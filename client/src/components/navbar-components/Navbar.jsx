import '../../assets/styles/navBar.scss';

import { Link } from 'react-router-dom';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';



export default function NavBar() {
    return (
        <div className="navBar">
            <div className="left">
                <Link to="/">
                    <img src="../../public/images/popshot-logo.png" alt="" />
                </Link>
                <HomeOutlinedIcon />
                <DarkModeOutlinedIcon />
                <GridViewOutlinedIcon />
                <div className="search">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder='Search' />
                </div>
            </div>
            <div className="right">
                <NotificationsNoneOutlinedIcon />
                <PersonOutlineOutlinedIcon />
                <div className="user">
                    <img src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profilePic" />
                    <span>Lyubomir Iliev</span>
                </div>
            </div>
        </div>

    );
}