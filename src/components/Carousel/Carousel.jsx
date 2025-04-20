// Carousel.js
import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import './Carousel.css';

const ITEMS = [
  {
    title: 'Praia tal',
    description: 'Design intuitive user interfaces and experiences.',
    icon: '🎨',
  },
  {
    title: 'Praia zbini',
    description: 'Build interactive, visually compelling web pages.',
    icon: '💻',
  },
  {
    title: 'Praia do Touco',
    description: 'Create engaging animations and transitions.',
    icon: '🎞️',
  },
  {
    title: 'Design Engineer',
    description: 'Focusing on details, design systems, and code.',
    icon: '⚙️',
  },
  {
    title: 'Product Management',
    description: 'Manage product lifecycle, from conception to launch.',
    icon: '📦',
  },
];

const ITEM_WIDTH = 240;
const GAP = 20;
const CONTAINER_WIDTH = ITEM_WIDTH + GAP;
const SPRING_OPTIONS = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export default function Carousel() {
  const x = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -50 || velocity < -500) {
      setCurrentIndex((prev) => Math.min(prev + 1, ITEMS.length - 1));
    } else if (offset > 50 || velocity > 500) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const leftConstraint = -((ITEM_WIDTH + GAP) * (ITEMS.length - 1));

  return (
    <div className="carousel-container">
      <motion.div
        className="carousel-track"
        drag="x"
        dragConstraints={{ left: leftConstraint, right: 0 }}
        style={{ x }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * (ITEM_WIDTH + GAP)) }}
        transition={SPRING_OPTIONS}
      >
        {ITEMS.map((item, index) => {
          const range = [
            (-100 * (index + 1) * CONTAINER_WIDTH) / 100,
            (-100 * index * CONTAINER_WIDTH) / 100,
            (-100 * (index - 1) * CONTAINER_WIDTH) / 100,
          ];
          const outputRange = [90, 0, -90];
          const rotateY = useTransform(x, range, outputRange);

          return (
            <motion.div
              key={index}
              className="carousel-item"
              style={{ rotateY }}
              transition={SPRING_OPTIONS}
            >
              <div className="carousel-icon">{item.icon}</div>
              <div className="carousel-title">{item.title}</div>
              <div className="carousel-description">{item.description}</div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="carousel-dots">
        {ITEMS.map((_, index) => (
          <motion.div
            key={index}
            className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
            animate={{ scale: currentIndex === index ? 1.2 : 1 }}
            onClick={() => setCurrentIndex(index)}
            transition={{ duration: 0.15 }}
          />
        ))}
      </div>
    </div>
  );
} 
