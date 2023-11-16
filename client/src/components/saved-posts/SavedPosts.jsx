import NavBar from "../navbar/NavBar";
import SavedPostCard from "./SavedPostCard";

export default function SavedPosts() {
    return(
        <>
        <NavBar />
        <h3>Saved Posts</h3>

        <SavedPostCard />
        <SavedPostCard />
        <SavedPostCard />
        <SavedPostCard />
        <SavedPostCard />
        </>

    );
}