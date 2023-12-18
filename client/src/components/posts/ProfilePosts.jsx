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
                    <div >
                        <ProfilePost post={post} key={post.id} />
                    </div>
                ))}

            </div>
        </>
    );
}

const NoPostsFound = () => {
    return (
        <div className="wrapper">
            <h1>No Posts Found...</h1>
        </div>
    )
}