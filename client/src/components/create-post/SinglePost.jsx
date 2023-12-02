import "../../assets/styles/singlePost.scss";

export default function SinglePost({ post }) {
    return (
        <div className="single-post">

            <div className="title">
                <h1>{post.title}</h1>
            </div>
            <div className="content">
                <p>{post.content}</p>
            </div>

            <div className="username">
                <p>@{post.username}</p>
            </div>

        </div>
    );

}