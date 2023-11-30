import { Routes, Route } from 'react-router-dom';

import HomePage from './components/home-page/HomePage';
import ExplorePage from './components/explore-page/ExplorePage';
import PeoplePage from './components/people-page/PeoplePage';
import SavedPosts from './components/saved-posts/SavedPosts';
import Login from './components/login-page/Login';
import Register from './components/register-page/Register';
import CreatePost from './components/create-post/CreatePost';
import Profile from './components/profile-page/Profile';
import NavBar from './components/navbar-components/NavBar';
import LeftBar from './components/navbar-components/LeftBar';
import RightBar from './components/navbar-components/RightBar';



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
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />

                {/* private routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<Layout />} />
                <Route path="/profile/:id" element={<Layout />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/people" element={<PeoplePage />} />
                <Route path="/saved" element={<SavedPosts />} />
                <Route path="/create" element={<CreatePost />} />
            </Routes>
        </div>
    );
}

export default App
