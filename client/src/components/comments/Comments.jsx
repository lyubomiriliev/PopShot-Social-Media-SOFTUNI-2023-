import '../../assets/styles/comments.scss';
import comments from '../../utils/CommentsUtil';

export default function Comments() {
    return (
        <div className="comments">
            <div className="write">

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