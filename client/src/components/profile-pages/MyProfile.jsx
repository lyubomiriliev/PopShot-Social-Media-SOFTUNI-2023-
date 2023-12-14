import "../../assets/styles/myProfile.scss";
import { Link, useParams } from 'react-router-dom';

import NavBar from '../navbar-components/NavBar';
import LeftBar from '../navbar-components/LeftBar';

import { Box, Modal } from "@mui/material";
import MyProfileEdit from "./MyProfileEdit";
import NotFound from "../404/NotFound";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import { useState } from "react";
import UserProfileContainer from "./UserProfileContainer";





export default function MyProfile() {

    const { username } = useParams();
    const { isLoading, userProfile } = useGetUserProfileByUsername(username);

    const userNotFound = !isLoading && !userProfile;
    if (userNotFound) return <NotFound />;

    return (
        <>
            <div className="profile">
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    {userProfile && <UserProfileContainer />}
                    <div style={{ flex: 6 }}>
                        {/* <ProfilePosts /> */}

                    </div>

                </div>
            </div>

        </>
    );
}