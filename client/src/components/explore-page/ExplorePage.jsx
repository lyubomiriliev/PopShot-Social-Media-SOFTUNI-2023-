import LeftBar from "../navbar-components/LeftBar";
import NavBar from "../navbar-components/NavBar";
import "../../assets/styles/explorePage.scss";

export default function ExplorePage() {
    return (
        <div className="explore-main">
            <div className="explore-scroller">
                <NavBar />

                <div style={{ display: "flex" }}>
                    <LeftBar />
                    <div style={{ flex: 6 }}>
                        <h2>Popular Today</h2>
                        <div className="sort">
                            <button>Sort By:</button>
                        </div>
                        <div className="post-card">
                            <img src="https://images.pexels.com/photos/1417255/pexels-photo-1417255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profilePic" />
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}