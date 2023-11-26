import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';



export default function LeftBar() {
    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src="https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg" alt="profilePic" />
                        <span>Lyubomir</span>
                    </div>
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
                    <div className="logout">
                        <ExitToAppOutlinedIcon />
                        <span>Logout</span>
                    </div>
                </div>

            </div>
        </div>
    );
}