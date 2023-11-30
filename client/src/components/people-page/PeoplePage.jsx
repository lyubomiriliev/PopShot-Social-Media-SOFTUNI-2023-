import SuggestedPeople from "../home-page/SuggestedPeople";
import NavBar from "../navbar-components/NavBar";


export default function PeoplePage() {
    return (
        <section id="people-main">
            <NavBar />
            <div className="people-scroller">
                <h3>All Users</h3>
                <SuggestedPeople />
                <SuggestedPeople />
                <SuggestedPeople />
                <SuggestedPeople />
                <SuggestedPeople />
            </div>
        </section>
    );
}