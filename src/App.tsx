import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import Proposal from './pages/Proposal';
import backgroundMusic from './assets/audio/bmloh.mp3';
import './App.css';

function App() {
  useEffect(() => {
    const audioElement = document.getElementById('background-music') as HTMLAudioElement;
    if (audioElement) {
      audioElement.volume = 0.3; // Volumen al 30%
      audioElement.play().catch(() => {
        // El navegador puede bloquear la reproducción automática
        console.log('Reproducción automática bloqueada. El usuario puede iniciarla manualmente.');
      });
    }
  }, []);

  return (
    <Router>
      <audio
        id="background-music"
        loop
        style={{ display: 'none' }}
      >
        <source src={backgroundMusic} type="audio/mpeg" />
        Tu navegador no soporta el elemento de audio.
      </audio>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/proposal" element={<Proposal />} />
      </Routes>
    </Router>
  );
}

export default App;
