import "../../assets/styles/comments.scss";

import CloseIcon from '@mui/icons-material/Close';
import useAuthStore from "../../store/authStore";




export default function Comments({ comment }) {

    const authUser = useAuthStore((state) => state.user);



    return (
        <div className="commentSection">
            <div className="newCommentContainer">
                <div className="commentMap">
                    <div className="postInner">
                        <img src={authUser.profilePicURL} alt="" />
                        <h3>{authUser.fullName}</h3>
                        <p>{comment.comment}</p>
                        <button ><CloseIcon /></button>
                    </div>
                </div>
            </div>
        </div>

    );

}