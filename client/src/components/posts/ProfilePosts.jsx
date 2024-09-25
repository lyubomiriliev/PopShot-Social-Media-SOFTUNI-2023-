import "../../assets/styles/profilePosts.scss";

import useGetUserPosts from "../../hooks/useGetUserPosts";
import ProfilePost from "./ProfilePost";

export default function ProfilePosts() {



    const { posts } = useGetUserPosts()

    const noPostsFound = posts.length === 0;

    if (noPostsFound) return <NoPostsFound />



    return (
        <>
            <div className="posts">
                {posts.map((post) => (
                    <div key={post.id} >
                        <ProfilePost post={post} />
                    </div>
                ))}

            </div>
        </>
    );
}

const NoPostsFound = () => {
    return (
        <div className="noPostsFound">
            <h1>The user still hasn't created a post...</h1>
        </div>
    )
}