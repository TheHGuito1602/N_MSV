import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Proposal.css';

const Proposal = () => {
  const [answered, setAnswered] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noRotate, setNoRotate] = useState(0);
  const [noScale, setNoScale] = useState(1);
  const [noText, setNoText] = useState('No');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; emoji: string }>>([]);
  const navigate = useNavigate();

  const handleYes = () => {
    setAnswered(true);
  };

  const handleNoHover = () => {
    // Calcular límites seguros considerando el tamaño de la pantalla
    // Asumiendo que el botón tiene aprox 100px de ancho y 50px de alto
    const buttonWidth = 100;
    const buttonHeight = 50;
    const padding = 20;
    
    const maxX = window.innerWidth / 2 - buttonWidth / 2 - padding;
    const minX = -window.innerWidth / 2 + buttonWidth / 2 + padding;
    const maxY = window.innerHeight / 2 - buttonHeight / 2 - padding;
    const minY = -window.innerHeight / 2 + buttonHeight / 2 + padding;
    
    // Generar posición aleatoria dentro de los límites
    let randomX = Math.random() * (maxX - minX) + minX;
    let randomY = Math.random() * (maxY - minY) + minY;
    
    // Clamping para asegurar que está dentro de los límites
    randomX = Math.max(minX, Math.min(maxX, randomX));
    randomY = Math.max(minY, Math.min(maxY, randomY));
    
    const randomRotate = Math.random() * 360;
    const randomScale = Math.random() * 0.3 + 0.8;
    
    // Textos divertidos aleatorios
    const funTexts = ['¿Seguro?', 'Intenta aquí', 'No tan rápido', '💨', 'Nope', '¡Corre!', 'Casi'];
    const randomText = funTexts[Math.floor(Math.random() * funTexts.length)];
    
    // Crear partículas animadas (corazones rotos)
    const brokenHearts = ['💔', '😢', '😭', '💢', '⚡'];
    const newParticles = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      emoji: brokenHearts[Math.floor(Math.random() * brokenHearts.length)],
    }));
    
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 1000);
    
    setNoPosition({ x: randomX, y: randomY });
    setNoRotate(randomRotate);
    setNoScale(randomScale);
    setNoText(randomText);
  };

  const goBack = () => {
    navigate('/timeline');
  };

  return (
    <div className="proposal-container">
      <motion.button
        className="back-button"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={goBack}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Volver
      </motion.button>

      <motion.div
        className="proposal-card"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 100 }}
      >
        {!answered ? (
          <>
            <motion.p
              className="proposal-emoji"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💝
            </motion.p>
            
            <motion.h1
              className="proposal-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              ¿Quieres ser mi San Valentín?
            </motion.h1>

            <motion.p
              className="proposal-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
            >
              Te prometo momentos llenos de amor, risas y muchos recuerdos hermosos ❤️
            </motion.p>

            <motion.div
              className="proposal-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
            >
              <motion.button
                className="btn-yes"
                onClick={handleYes}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Sí, quiero 💕
              </motion.button>

              <motion.button
                className="btn-no"
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                animate={{ 
                  x: noPosition.x, 
                  y: noPosition.y,
                  rotate: noRotate,
                  scale: noScale,
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 25,
                  mass: 0.8,
                }}
                whileTap={{ scale: 0.8 }}
              >
                {noText}
              </motion.button>

              {/* Partículas animadas */}
              <AnimatePresence>
                {particles.map((particle) => (
                  <motion.div
                    key={particle.id}
                    className="particle"
                    initial={{ 
                      x: particle.x, 
                      y: particle.y, 
                      opacity: 1,
                      scale: 1
                    }}
                    animate={{ 
                      x: particle.x * 2, 
                      y: particle.y * 2,
                      opacity: 0,
                      scale: 0.5
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {particle.emoji}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <motion.div
            className="celebration"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p
              className="celebration-emoji"
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🎉
            </motion.p>

            <motion.h1
              className="celebration-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              ¡Eres la Mejor Decisión!
            </motion.h1>

            <motion.p
              className="celebration-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Eres lo mejor que me ha pasado en la vida.
              Este San Valentín será especial porque estás tú en él. 💖
            </motion.p>

            <motion.p
              className="celebration-emoji smaller"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              💕 ❤️ 💗 💓 💞
            </motion.p>

            <motion.button
              className="celebrate-button"
              onClick={goBack}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← Volver a nuestra historia
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Confetti animado */}
      {answered && (
        <div className="confetti">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti-piece"
              initial={{ y: -10, x: Math.random() * window.innerWidth }}
              animate={{
                y: window.innerHeight + 10,
                x: Math.random() * window.innerWidth,
                rotate: Math.random() * 360,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                delay: Math.random() * 0.5,
              }}
            >
              {['❤️', '💕', '💖', '💗', '✨', '🎉'][Math.floor(Math.random() * 6)]}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Proposal;
