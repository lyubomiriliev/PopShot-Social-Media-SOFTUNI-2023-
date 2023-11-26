import { Routes, Route } from 'react-router-dom';

import HomePage from './components/home-page/HomePage';
import ExplorePage from './components/explore-page/ExplorePage';
import PeoplePage from './components/people-page/PeoplePage';
import SavedPosts from './components/saved-posts/SavedPosts';
import Login from './components/login-page/Login';
import Register from './components/register-page/Register';
import UserProfile from './components/profile-page/UserProfile';
import CreatePost from './components/create-post/CreatePost';

function App() {

  return (
    <div className='bg'>
      <Routes>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* private routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/saved" element={<SavedPosts />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </div>
  );
}

export default App
