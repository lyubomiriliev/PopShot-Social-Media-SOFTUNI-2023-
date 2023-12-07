import { Routes, Route } from 'react-router-dom';
import Path from './paths';

import HomePage from './components/home-page/HomePage';
import PeoplePage from './components/people-page/PeoplePage';
import SavedPosts from './components/saved-posts/SavedPosts';
import Login from './components/login-page/Login';
import Register from './components/register-page/Register';
import Profile from './components/profile-page/Profile';
import NavBar from './components/navbar-components/NavBar';
import LeftBar from './components/navbar-components/LeftBar';
import RightBar from './components/navbar-components/RightBar';
import MyProfile from './components/profile-page/MyProfile';
import MyProfileEdit from './components/profile-page/MyProfileEdit';
import CreatePostPage from './components/create-post/CreatePostPage';
import GetPeople from './components/create-post/GetPeople';
import ExplorePage from './components/explore-page/ExplorePage';
import Comments from './components/comments/Comments';
import Settings from './components/settings/Settings';
// import AuthGuard from './components/guards/AuthGuard';


function App() {

    const Layout = () => {
        return (
            <div>
                <NavBar />
                <div style={{ display: "flex" }}>
                    <LeftBar />
                    <Profile />
                    <RightBar />
                </div>
            </div>
        )
    }

    return (
        <div className='bg'>
            <Routes>
                {/* public routes */}
                <Route path={Path.Login} element={<Login />} />
                <Route path={Path.Register} element={<Register />} />
                {/* private routes */}

                {/* <Route element={<AuthGuard />}> */}
                <Route path={Path.Home} element={<HomePage />} />
                <Route path={Path.MyProfile} element={<MyProfile />} />
                <Route path={Path.Settings} element={<MyProfileEdit />} />
                <Route path={Path.UserProfile} element={<Layout />} />
                <Route path={Path.Explore} element={<ExplorePage />} />
                <Route path={Path.People} element={<PeoplePage />} />
                <Route path={Path.Saved} element={<SavedPosts />} />
                <Route path={Path.CreatePost} element={<CreatePostPage />} />
                <Route path='/getpeople' element={<GetPeople />} />
                <Route path='/comments' element={<Comments />} />
                <Route path='/settings' element={<Settings />} />
                {/* </Route> */}
            </Routes>
        </div >
    );
}

export default App