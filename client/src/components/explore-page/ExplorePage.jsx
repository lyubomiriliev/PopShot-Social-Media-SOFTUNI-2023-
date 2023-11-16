import NavBar from "../navbar/NavBar";
import ExplorePagePost from "./ExplorePagePost";

export default function ExplorePage() {
    return(
        <section id="explore-main">
            <NavBar />
            <div className="explore-scroller">
                <h3>Search Posts:</h3>
                <input type="text" placeholder="Search" />
                <h4>Popular Today</h4>
                <ExplorePagePost />
                <ExplorePagePost />
                <ExplorePagePost />
                <ExplorePagePost />
            </div>

        </section>
    );
}