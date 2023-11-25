import NavBar from "../navbar/NavBar";
import NewPost from "./NewPost";
import SuggestedPeople from "./SuggestedPeople";

export default function HomePage() {
    return (
        <>
            <NavBar />

            <section className="main-section">


                <div className="scroller">
                    <NewPost />
                    <NewPost />
                </div>

                <div className="right-col">
                    <img src="#" alt="profilePic" />
                    <p>Your profile</p>
                    <p>@username</p>
                    <h3>People you may know</h3>
                    <SuggestedPeople />
                    <SuggestedPeople />
                    <SuggestedPeople />
                    <SuggestedPeople />
                </div>
            </section>
        </>
    );
}
