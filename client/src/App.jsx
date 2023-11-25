import { Routes, Route } from 'react-router-dom';

import HomePage from './components/home-page/HomePage';
import ExplorePage from './components/explore-page/ExplorePage';
import PeoplePage from './components/people-page/PeoplePage';
import SavedPosts from './components/saved-posts/SavedPosts';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/saved" element={<SavedPosts />} />
      </Routes>
    </div>
  );
}

export default App
