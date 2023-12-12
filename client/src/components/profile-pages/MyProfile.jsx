import "../../assets/styles/myProfile.scss";
import { Link } from 'react-router-dom';

import NavBar from '../navbar-components/NavBar';
import LeftBar from '../navbar-components/LeftBar';
import { UserAuth } from "../../contexts/AuthConext";





export default function MyProfile() {

    const { user } = UserAuth();

    return (
        <>
            <div className="profile">
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    <div style={{ flex: 6 }}>
                        <div className="images">
                            <img src="https://images.pexels.com/photos/2876511/pexels-photo-2876511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="cover" />
                            <img src={user.photoURL} alt="" className="profilePic" />
                        </div>
                        <div className="profileContainerr">
                            <div className="userInfo">
                                <div className="left">
                                    <div className="item">
                                        <p>25 posts</p>
                                        <p>468 followers</p>
                                        <p>166 following</p>
                                    </div>
                                </div>
                                <div className="center">
                                    <span>{user?.displayName}</span>
                                    <div className="info">
                                        <p>About: Graphic Designer @ New Bulgarian University</p>
                                        <p>Sofia, BG</p>
                                    </div>
                                </div>


                                <div className="right">
                                    <Link to='/settings'>
                                        <button style={{ textDecoration: 'none' }}>Edit Profile</button>
                                    </Link>
                                </div>


                            </div>

                        </div>
                        <div className="profileFeed">
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                            <div>
                                <img src="https://images.pexels.com/photos/17007145/pexels-photo-17007145/free-photo-of-aerial-photo-of-few-islands-surrounded-by-boats.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </>
    );
}