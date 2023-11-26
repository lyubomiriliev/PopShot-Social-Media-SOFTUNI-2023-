import { Outlet } from "react-router-dom";
import LeftBar from "../navbar-components/LeftBar";
import Navbar from "../navbar-components/Navbar";
import RightBar from "../navbar-components/RightBar";

export default function HomePage() {
    return (
        <div>
            <Navbar />
            <div style={{ display: "flex" }}>
                <LeftBar />
                <div style={{ flex: 6 }}>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                    <h1>Home</h1>
                </div>
                <RightBar />

            </div>
        </div>
    );
}
