import React, { useState, useEffect } from "react";
import "./SlidingCards.css";

interface Card {
  id: number;
  title: string;
  content: string;
  image?: string;
}

interface SlidingCardsProps {
  cards: Card[];
  autoSlide?: boolean;
  slideDelay?: number;
}

const SlidingCards: React.FC<SlidingCardsProps> = ({
  cards,
  autoSlide = true,
  slideDelay = 2000,
}) => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    if (autoSlide) {
      cards.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards((prev) => [...prev, index]);
        }, index * slideDelay);
      });
    } else {
      setVisibleCards(cards.map((_, index) => index));
    }
  }, [cards, autoSlide, slideDelay]);

  return (
    <div className="sliding-cards-container">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className={`card ${
            visibleCards.includes(index) ? "slide-in" : "hidden"
          }`}
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          {card.image && (
            <img src={card.image} alt={card.title} className="card-image" />
          )}
          <div className="card-content">
            <h3 className="card-title">{card.title}</h3>
            <p className="card-text">{card.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlidingCards;
