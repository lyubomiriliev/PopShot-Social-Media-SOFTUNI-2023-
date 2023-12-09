export default function SavedPost({ post }) {
    return (
        <div key={post.id} className="post-card">
            <img src={post.imageURL} alt={post.title} />
            <span>{post.title}</span>
        </div>
    );
}