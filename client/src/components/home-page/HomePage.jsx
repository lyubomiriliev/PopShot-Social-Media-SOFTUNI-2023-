import NewPost from "./NewPost";

export default function HomePage() {
    return(
        <section>
            <div className="left-bar">
            <img src="#" alt="logo" />
            <button>Home</button>
            <button>Explore</button>
            <button>People</button>
            <button>Saved</button>
            <button>Create Post</button>
            <a href="#">Log out</a>
            </div>

            <NewPost />
        </section>
    );
}
