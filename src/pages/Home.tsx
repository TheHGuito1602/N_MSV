import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

interface Heart {
  id: number;
  x: number;
  y: number;
  finalX: number;
  finalY: number;
  emoji: string;
}

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleOpenLetter = () => {
    setIsOpen(true);
  };

  const goToTimeline = () => {
    navigate('/timeline');
  };

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // No crear corazones si se hace clic en el sobre o la carta
    if ((e.target as HTMLElement).closest('.envelope') || (e.target as HTMLElement).closest('.letter')) {
      return;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const emojis = ['💕', '❤️', '💖', '💗', '💝', '✨', '💓', '💞', '🌹', '💘'];
    const newHearts = Array.from({ length: 8 }, (_, i) => {
      // Dispersar en todas direcciones usando ángulos
      const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.3 - 0.15);
      const distance = 150;
      const finalX = x + Math.cos(angle) * distance;
      const finalY = y + Math.sin(angle) * distance;

      return {
        id: Date.now() + i,
        x,
        y,
        finalX,
        finalY,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };
    });

    setHearts((prev) => [...prev, ...newHearts]);
    
    // Limpiar corazones después de 2 segundos
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => !newHearts.find((nh) => nh.id === h.id)));
    }, 2000);
  };

  return (
    <div className="home-container" ref={containerRef} onClick={handleContainerClick}>
      <motion.div
        className="envelope"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {!isOpen ? (
          <motion.div
            className="envelope-front"
            whileHover={{ scale: 1.05 }}
            onClick={handleOpenLetter}
          >
            <div className="envelope-flap"></div>
            <div className="envelope-body">
              <p className="envelope-text">Para Mi Amor💝</p>
              <p className="envelope-hint">Haz clic para abrir</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="letter"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.button
              className="close-letter-button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Cerrar carta"
            >
              ✕
            </motion.button>
            <motion.div
              className="letter-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
            >
              <h1 className="letter-title">Mi amor ❤️</h1>
              <p className="letter-text">
                Hoy quiero recordarte lo especial que eres para mí... Mi Amor eterno
              </p>
              <p className="letter-text">
                Podrá nublarse el sol eternamente;<br />
                podrá secarse en un instante el mar;<br />
                podrá romperse el eje de la tierra<br />
                como un débil cristal.<br />
                <br />
                ¡Todo sucederá! Podrá la muerte<br />
                cubrirme con su fúnebre crespón;<br />
                pero jamás en mí podrá apagarse<br />
                la llama de tu amor.
              </p>
              <p className="letter-text">
                -Gustavo Adolfo Bécquer
              </p>
              <motion.button
                className="timeline-button"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                onClick={goToTimeline}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lo que eres para mí ✨
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="hearts-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-heart"
            initial={{ y: '100vh', x: Math.random() * window.innerWidth }}
            animate={{
              y: '-100vh',
              x: Math.random() * window.innerWidth,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          >
            ❤️
          </motion.div>
        ))}
      </motion.div>

      {/* Corazones interactivos al hacer clic */}
      <motion.div className="interactive-hearts">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="interactive-heart"
            initial={{ x: heart.x, y: heart.y, opacity: 1, scale: 1 }}
            animate={{
              y: heart.finalY,
              x: heart.finalX,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 1.5 + 1.5,
              ease: 'easeOut',
            }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
