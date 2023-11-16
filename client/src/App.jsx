import { Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './components/home-page/HomePage';

function App() {

  return (
    <div>

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App
