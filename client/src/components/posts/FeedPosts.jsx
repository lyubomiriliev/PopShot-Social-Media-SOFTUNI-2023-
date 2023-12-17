import "../../assets/styles/feedPosts.scss"

import useGetFeedPosts from "../../hooks/useGetFeedPosts";
import FeedPost from "./FeedPost";

export default function FeedPosts() {

    const { posts } = useGetFeedPosts()



    return (
        <div className="posts">
            {posts.length === 0 && (
                <h1>You must follow other users to see their posts.</h1>
            )}

            {posts.length > 0 && posts.map((post) =>
                <FeedPost key={post.id} post={post} />
            )}
        </div>
    );
}


