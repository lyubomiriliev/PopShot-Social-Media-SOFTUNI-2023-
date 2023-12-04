import posts from "../../utils/PostsUtil";
import Post from "./Post";
import "../../assets/styles/posts.scss";


export default function Posts() {
    return (
        <div className="posts">
            {posts.map(post => (
                <Post post={post} key={post.id} />
            ))}
        </div>
    );
}