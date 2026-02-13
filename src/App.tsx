import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Proposal from './pages/Proposal';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/proposal" element={<Proposal />} />
      </Routes>
    </Router>
  );
}

export default App;
