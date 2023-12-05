import { Routes, Route } from 'react-router-dom';

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
import { PostContext } from './contexts/postsContext';





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
            <PostContext>
                <Routes>
                    {/* public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    {/* private routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<MyProfile />} />
                    <Route path='/profile/edit' element={<MyProfileEdit />} />
                    <Route path="/profile/:id" element={<Layout />} />
                    <Route path="/explore" element={<ExplorePage />} />
                    <Route path="/people" element={<PeoplePage />} />
                    <Route path="/saved" element={<SavedPosts />} />
                    <Route path="/create" element={<CreatePostPage />} />
                    <Route path='/getpeople' element={<GetPeople />} />
                    <Route path='/comments' element={<Comments />} />
                </Routes>
            </PostContext>
        </div >
    );
}

export default App
