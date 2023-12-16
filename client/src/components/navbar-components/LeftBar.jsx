import "../../assets/styles/leftBar.scss";
import { Link } from 'react-router-dom';

import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';



export default function LeftBar() {



    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="createPost">
                        <AddCircleOutlineOutlinedIcon />
                        <div className="createBtn">
                            <Link to="/create">
                                <button>Create Post</button>
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
                    <div className="explore">
                        <CollectionsOutlinedIcon />
                        <div className="exploreBtn">
                            <Link to="/explore">
                                <button>Explore</button>
                            </Link>
                        </div>
                    </div>
                    <div className="user">
                        <SettingsOutlinedIcon />
                        <div className="settingsBtn">
                            <Link to="/settings">
                                <button>Settings</button>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}