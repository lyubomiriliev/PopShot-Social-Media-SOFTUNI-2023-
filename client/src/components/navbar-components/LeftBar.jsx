import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import '../../assets/styles/leftBar.scss';

import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase';




export default function LeftBar() {

    const signOutUser = async () => {
        await signOut(auth);
    }

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="explore">
                        <CollectionsOutlinedIcon />
                        <span>Explore</span>
                    </div>
                    <div className="people">
                        <PeopleAltOutlinedIcon />
                        <span>People</span>
                    </div>
                    <div className="saved">
                        <BookmarkBorderOutlinedIcon />
                        <span>Saved</span>
                    </div>
                    <div className="createPost">
                        <AddCircleOutlineOutlinedIcon />
                        <span>Create Post</span>
                    </div>
                    <div className="user">
                        <SettingsOutlinedIcon />
                        <span>Settings</span>
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