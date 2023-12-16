import "../../assets/styles/leftBar.scss";
import { Link } from 'react-router-dom';

import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Search from "../search-users/Search";
import { useState } from "react";



export default function LeftBar() {

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);


    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="createPost">
                        <AddCircleOutlineOutlinedIcon />
                        <div className="createBtn">
                            <Link to="/create">
                                <button>Create</button>
                            </Link>
                        </div>
                    </div>
                    <div className="search">
                        <SearchOutlinedIcon />
                        <div className="searchBtn">
                            <Search open={open} handleClose={handleClose} />
                        </div>
                    </div>
                    <div className="explore">
                        <CollectionsOutlinedIcon />
                        <div className="exploreBtn">
                            <Link to="/explore">
                                <button>Explore</button>
                            </Link>
                        </div>
                    </div>
                    <div className="people">
                        <PeopleAltOutlinedIcon />
                        <div className="peopleBtn">
                            <Link to="/people">
                                <button>People</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}