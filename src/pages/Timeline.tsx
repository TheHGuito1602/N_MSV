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
    date: 'N',
    title: 'No Olvidaré Aquel Día Que Cambió Mi Vida',
    description: 'Te vi y todo el mundo desapareció. Tu sonrisa iluminó mi alma. Fue amor a primera vista. 💫',
    emoji: '✨',
  },
  {
    date: 'O',
    title: 'O Donde Todo Comenzó',
    description: 'Ese momento mágico me hace anhelar tus labios tocando los míos. Desearé que el tiempo se detenga y solo existir nosotros dos. 💋',
    emoji: '💕',
  },
  {
    date: 'E',
    title: 'Eres Mi Refugio',
    description: 'En ti encontré mi hogar. Tu anor me protege, tu amor me completa. Eres mi paz. 🏠',
    emoji: '💑',
  },
  {
    date: 'M',
    title: 'Me Alegras Sin Fin',
    description: 'Tu risa es mi canción favorita. Los momentos contigo son los más preciosos de mi vida. ¡Cómo te amo! 🎵',
    emoji: '😍',
  },
  {
    date: 'Í',
    title: 'íbamos Sin Pensar En El Mañana',
    description: 'En tus ojos veo el futuro, veo nuestro destino escrito. Son los ojos más hermosos que he visto. 👀',
    emoji: '🌌',
  },
  {
    date: 'C',
    title: 'Cuantas Aventuras Tendré A Tu Lado',
    description: 'Cada lugar es especial si estás conmigo. Exploremos el mundo juntos y creemos recuerdos infinitos. 🌍',
    emoji: '✈️',
  },
  {
    date: 'R',
    title: 'Reaccionas Con Una Química Perfecta',
    description: 'Somos el uno para el otro, una química perfecta, un match hecho en el cielo. Eres mi persona indicada. 💫',
    emoji: '🔥',
  },
  {
    date: 'U',
    title: 'Unta De Tu Perfume En Mí',
    description: 'El aroma de tu perfume es lo que más amo sentir. Te llevaría en mi corazón a todos lados. 🌸',
    emoji: '💐',
  },
  {
    date: 'Z',
    title: 'Zarpa Un Barco De Sueños Compartidos',
    description: 'Juntos construiremos nuestro futuro. Nuestros sueños se entrelazan en una hermosa realidad. 🌈',
    emoji: '✨',
  },
  {
    date: 'C',
    title: 'Contigo Encuentro Mi Razón de Ser',
    description: 'Despiertas y eres lo primero que pienso. Eres mi razón para sonreír cada mañana. Te amo. 🌅',
    emoji: '☀️',
  },
  {
    date: 'O',
    title: 'O Darás Sentido A Los Pequeños Detalles',
    description: 'Cada caricia, cada beso, cada palabra tuya me enamora más. Los detalles te hacen especial. 💝',
    emoji: '🎁',
  },
  {
    date: 'N',
    title: 'Mi Todo En Uno',
    description: 'Eres mi amor, mi amiga, mi confidente. Juntos navegamos la vida sin miedo. 👯',
    emoji: '💖',
  },
  {
    date: 'T',
    title: 'Tu Me Llevas Al Infinito y Más Allá',
    description: 'Mi amor por ti es infinito, trasciende el espacio y el tiempo. Eres eternidad para mí. ∞',
    emoji: '🌟',
  },
  {
    date: 'R',
    title: 'Resuena En Mí, Eres Mi Melodía',
    description: 'Tu voz es mi canción favorita. Cada palabra tuya resuena en mi alma. Te amo en silencio y en gritos. 🎶',
    emoji: '🎼',
  },
  {
    date: 'E',
    title: 'Entre Tus Brazos Hallaré Mi Cura',
    description: 'Tu abrazo es mi medicina, mi refugio seguro. En tus brazos todo está bien. 🤗',
    emoji: '💪',
  },
  {
    date: 'R',
    title: 'Refuerzas El Fuego y Pasión',
    description: 'Te deseo con cada fibra de mi ser. Nuestra pasión es un fuego que no se apaga nunca. 🔥',
    emoji: '💥',
  },
  {
    date: 'A',
    title: 'Ahora Y Para Siempre Eres Mi Otra Mitad',
    description: 'Eres la otra mitad de mi alma. Juntos somos completos, enteros, perfectos. 💓',
    emoji: '💑',
  },
  {
    date: 'S',
    title: '¡Sé Mi San Valentín!',
    description: 'Quiero pasar la eternidad contigo, enamorándome cada día. ¿Quieres ser mi San Valentín para siempre? 💕',
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
        ✨ Nuestra Historia de Amor ❤️ ✨
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
              <h3 className="timeline-initial">{event.date}</h3>
              <div className="timeline-emoji">{event.emoji}</div>
              <h2 className="timeline-event-title">{event.title}</h2>
              <p className="timeline-description">{event.description}</p>
              
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
              
              <p className="timeline-click-hint">
                {index === events.length - 1 ? 'Toca para responder' : 'Toca aquí'}
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
          Este es solo el comienzo de nuestra eternidad juntos... 💕✨
        </p>
      </motion.div>
    </div>
  );
};

export default Timeline;
