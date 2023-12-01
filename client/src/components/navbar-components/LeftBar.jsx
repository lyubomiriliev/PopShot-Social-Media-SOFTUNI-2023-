import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import '../../assets/styles/leftBar.scss';
import { Link, useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase';




export default function LeftBar() {

    const navigate = useNavigate();

    const signOutUser = async () => {
        await signOut(auth);
        navigate('/login')
    }

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="explore">
                        <CollectionsOutlinedIcon />
                        <Link to="/explore">
                            <button>Explore</button>
                        </Link>
                    </div>
                    <div className="people">
                        <PeopleAltOutlinedIcon />
                        <Link to="/people">
                            <button>People</button>
                        </Link>
                    </div>
                    <div className="saved">
                        <BookmarkBorderOutlinedIcon />
                        <Link to="/saved">
                            <button>Saved</button>
                        </Link>
                    </div>
                    <div className="createPost">
                        <AddCircleOutlineOutlinedIcon />
                        <Link to="/create">
                            <button>Create Post</button>
                        </Link>
                    </div>
                    <div className="user">
                        <SettingsOutlinedIcon />
                        <Link to="/settings">
                            <button>Settings</button>
                        </Link>
                    </div>

                    <div className="logout">
                        <ExitToAppOutlinedIcon />
                        <button onClick={signOutUser} >Logout</button>
                    </div>

                </div>

            </div>
        </div>
    );
}