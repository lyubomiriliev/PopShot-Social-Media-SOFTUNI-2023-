import { Routes, Route } from 'react-router-dom';
import AuthGuard from './components/guards/AuthGuard';
import { AuthContextProvider } from './contexts/AuthConext';
import Path from './paths';

import HomePage from './components/home-page/HomePage';
import PeoplePage from './components/people-page/PeoplePage';
import SavedPosts from './components/saved-posts/SavedPosts';
import Login from './components/login-page/Login';
import Register from './components/register-page/Register';
import MyProfile from './components/profile-pages/MyProfile';
import CreatePostPage from './components/posts/CreatePostPage';
import ExplorePage from './components/explore-page/ExplorePage';
import Settings from './components/settings/Settings';
import NotFound from './components/404/NotFound';
import UserProfileLayout from './components/profile-pages/UserProfileLayout';




function App() {

    return (
        <div className='bg'>
            <AuthContextProvider>
                <Routes>
                    {/* public routes */}
                    <Route path={Path.Login} element={<Login />} />
                    <Route path={Path.Register} element={<Register />} />
                    {/* private routes */}
                    <Route path={Path.Home} element={<AuthGuard><HomePage /></AuthGuard>} />
                    <Route path={Path.MyProfile} element={<AuthGuard><MyProfile /></AuthGuard>} />
                    <Route path={Path.UserProfile} element={<AuthGuard><UserProfileLayout /></AuthGuard>} />
                    <Route path={Path.Explore} element={<AuthGuard><ExplorePage /></AuthGuard>} />
                    <Route path={Path.People} element={<AuthGuard><PeoplePage /></AuthGuard>} />
                    <Route path={Path.Saved} element={<AuthGuard><SavedPosts /></AuthGuard>} />
                    <Route path={Path.CreatePost} element={<AuthGuard><CreatePostPage /></AuthGuard>} />
                    <Route path={Path.Settings} element={<AuthGuard><Settings /></AuthGuard>} />
                    <Route path={Path.NotFound} element={<NotFound />} />
                </Routes>
            </AuthContextProvider>
        </div >
    );
}

export default App