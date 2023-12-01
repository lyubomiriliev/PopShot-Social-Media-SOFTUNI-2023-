import NavBar from "../navbar-components/NavBar";
import ExplorePagePost from "./ExplorePagePost";
import "../../assets/styles/explore.scss";

export default function ExplorePage() {
    return (
        <section id="explore-main">
            <NavBar />
            <div className="explore-scroller">
                <h3>Search Posts:</h3>
                <input type="text" placeholder="Search" />
                <h4>Popular Today</h4>
                <button>Sort By:</button>
                <ExplorePagePost />
                <ExplorePagePost />
                <ExplorePagePost />
                <ExplorePagePost />
            </div>

        </section>
    );
}