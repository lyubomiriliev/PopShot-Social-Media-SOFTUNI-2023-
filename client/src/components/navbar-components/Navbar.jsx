import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link } from 'react-router-dom';


export default function Navbar() {
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
                <PersonOutlineOutlinedIcon />
                <div className="user">
                    <img src="https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt="profilePic" />
                    <span>Lyubomir Iliev</span>
                </div>
            </div>
        </div>

    );
}