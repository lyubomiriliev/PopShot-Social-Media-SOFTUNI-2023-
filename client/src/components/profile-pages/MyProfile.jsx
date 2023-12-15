import "../../assets/styles/myProfile.scss";
import { Link, useParams } from 'react-router-dom';

import NavBar from '../navbar-components/NavBar';
import LeftBar from '../navbar-components/LeftBar';

import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import UserProfileContainer from "./UserProfileContainer";
import Path from "../../paths";
import ProfilePosts from "../posts/ProfilePosts";





export default function MyProfile() {

    const { username } = useParams();
    const { isLoading, userProfile } = useGetUserProfileByUsername(username);

    const userNotFound = !isLoading && !userProfile;
    if (userNotFound) return <UserNotFound />;

    return (
        <>
            <div className="profile">
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    {userProfile && <UserProfileContainer />}
                    <div style={{ flex: 6 }}>
                        <ProfilePosts />

                        {/* <ProfileTabs /> */}
                    </div>

                </div>
            </div>

        </>
    );
}

const UserNotFound = () => {
    return (
        <div>
            <h1>User Not <Found></Found></h1>
            <Link to={Path.Home}>
                <h3>Go home</h3>
            </Link>
        </div>
    );
};