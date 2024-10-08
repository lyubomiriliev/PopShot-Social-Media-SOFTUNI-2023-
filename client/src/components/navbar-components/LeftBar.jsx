import "../../assets/styles/leftBar.scss";
import { Link } from 'react-router-dom';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';

import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Search from "../search-users/Search";
import { useState } from "react";
import useLogout from "../../hooks/useLogout";

export default function LeftBar() {


    const { handleUserLogout } = useLogout();
    const [open, setOpen] = useState(false);

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <Link className="createLink" to="/create">
                        <div className="createPost">
                            <AddCircleOutlineOutlinedIcon />
                            <span>Create</span>
                        </div>
                    </Link>

                    <div className="search" onClick={() => setOpen(true)}>
                        <SearchOutlinedIcon className="searchSVG" />
                        <span>Search</span>
                    </div>

                    <Link to="/explore">
                        <div className="explore">
                            <CollectionsOutlinedIcon />
                            <span>Explore</span>
                        </div>
                    </Link>

                    <Link to="/people">
                        <div className="people">
                            <PeopleAltOutlinedIcon />
                            <span>People</span>
                        </div>
                    </Link>
                </div>
                <div className="logout">
                    <ExitToAppOutlinedIcon onClick={handleUserLogout} />
                    <span>Log out</span>
                </div>
            </div>
            <Search open={open} handleCloseModal={handleCloseModal} />
        </div>
    );
}
