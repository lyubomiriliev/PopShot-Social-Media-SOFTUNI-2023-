import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/home-page/HomePage';
import ExplorePage from './components/explore-page/ExplorePage';

function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/explore' element={<ExplorePage />} />
      </Routes>
    </div>
  );
}

export default App
