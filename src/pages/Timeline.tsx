import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Timeline.css';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  emoji: string;
  image?: string;
}

// ¡Personaliza estos momentos con tu historia real!
const events: TimelineEvent[] = [
  {
    date: 'Enero 2025',
    title: 'Nuestro Primer Encuentro',
    description: 'El día que todo comenzó. Tu sonrisa iluminó mi mundo.',
    emoji: '✨',
    image: '/images/momento1.jpg', // Reemplaza con tu imagen
  },
  {
    date: 'Marzo 2025',
    title: 'Primera Aventura',
    description: 'Aquella salida inolvidable donde descubrimos cuánto teníamos en común.',
    emoji: '🎉',
    image: '/images/momento2.jpg', // Reemplaza con tu imagen
  },
  {
    date: 'Junio 2025',
    title: 'Un Momento Especial',
    description: 'Ese día perfecto que quedará por siempre en mi memoria.',
    emoji: '💫',
    image: '/images/momento3.jpg', // Reemplaza con tu imagen
  },
  {
    date: 'Septiembre 2025',
    title: 'Nuevas Experiencias',
    description: 'Juntos hemos compartido risas, aventuras y sueños.',
    emoji: '🌟',
    image: '/images/momento4.jpg', // Reemplaza con tu imagen
  },
  {
    date: 'Diciembre 2025',
    title: 'Creciendo Juntos',
    description: 'Cada día a tu lado es un regalo. Gracias por ser tú.',
    emoji: '💝',
    image: '/images/momento5.jpg', // Reemplaza con tu imagen
  },
  {
    date: 'Febrero 2026',
    title: 'Este San Valentín',
    description: '¿Quieres ser mi San Valentín? 💕',
    emoji: '❤️',
  },
];

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleLastEventClick = () => {
    navigate('/proposal');
  };

  return (
    <div className="timeline-container">
      <motion.button
        className="back-button"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={() => navigate('/')}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Volver a la carta
      </motion.button>

      <motion.h1
        className="timeline-title"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Nuestra Historia ❤️
      </motion.h1>

      <div className="timeline">
        {events.map((event, index) => (
          <motion.div
            key={index}
            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            onClick={() => {
              if (index === events.length - 1) {
                handleLastEventClick();
              } else {
                setSelectedEvent(selectedEvent === index ? null : index);
              }
            }}
          >
            <motion.div
              className="timeline-content"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="timeline-emoji">{event.emoji}</div>
              <h3 className="timeline-date">{event.date}</h3>
              <h2 className="timeline-event-title">{event.title}</h2>
              
              {event.image && (
                <motion.div
                  className="timeline-image-container"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: selectedEvent === index ? 1 : 0,
                    height: selectedEvent === index ? 'auto' : 0,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="timeline-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </motion.div>
              )}
              
              <motion.p
                className="timeline-description"
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: selectedEvent === index ? 'auto' : 0,
                  opacity: selectedEvent === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                {event.description}
              </motion.p>
              <p className="timeline-click-hint">
                {index === events.length - 1 ? 'Toca para responder' : selectedEvent === index ? 'Toca para cerrar' : 'Toca para leer más'}
              </p>
            </motion.div>
            <div className="timeline-dot"></div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="timeline-footer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <p className="footer-text">
          Y esta es solo el comienzo de nuestra historia... 💕
        </p>
      </motion.div>
    </div>
  );
};

export default Timeline;
