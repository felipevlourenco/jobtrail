import { Button, Card, type CardProps } from '@repo/ui';
import { useState } from 'react';

const CARDS: Array<Pick<CardProps, 'title' | 'description'>> = Array.from(
    Array(10).keys(),
).map((i) => ({
    title: `Card ${i + 1}`,
    description: `description ${i + 1}`,
}));

function CardList() {
    const [reversedList, setReversedList] = useState(false);

    const cardsList = reversedList ? [...CARDS].reverse() : CARDS;

    return (
        <div>
            <Button onClick={() => setReversedList((prev) => !prev)}>
                Reverse the list
            </Button>
            {cardsList.map((card, index) => (
                // <Card key={index} id={index} {...card} /> // > index-key
                <Card key={card.title} id={card.title} {...card} />
            ))}
        </div>
    );
}

export default CardList;
