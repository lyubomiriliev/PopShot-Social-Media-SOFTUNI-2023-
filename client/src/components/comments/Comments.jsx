import '../../assets/styles/comments.scss';
import comments from '../../utils/CommentsUtil';

import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

export default function Comments() {
    return (
        <div className="comments">
            <div className="write">
                <img src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="" />
                <input type="text" placeholder='Write a comment.' />
                <SendOutlinedIcon />
            </div>
            {comments.map(comment => (
                <div className="comment">
                    <img src={comment.profilePic} alt="image" />
                    <div className="info">
                        <span>{comment.name}</span>
                        <p>{comment.desc}</p>
                    </div>
                    <span className='date'>1 hour ago</span>

                </div>
            ))}
        </div>
    );
}