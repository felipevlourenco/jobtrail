import {
    Badge,
    Button,
    Card,
    type BadgeVariant,
    type ButtonVariants,
} from '@repo/ui';
import { useState } from 'react';

const CARDS: Array<{ id: number; header: string }> = Array.from(
    Array(10).keys(),
).map((i) => ({
    id: i + 1,
    header: `Card ${i + 1}`,
}));

const randomStatus = (index: number): BadgeVariant => {
    if (index % 2 === 0) {
        return 'success';
    } else if (index % 3 === 0) {
        return 'danger';
    } else if (index % 4 === 0) {
        return 'warning';
    }

    return 'neutral';
};

const randomButton = (index: number): ButtonVariants => {
    if (index % 2 === 0) {
        return 'primary';
    } else if (index % 3 === 0) {
        return 'danger';
    } else if (index % 4 === 0) {
        return 'secondary';
    }

    return 'ghost';
};

function CardList() {
    const [reversedList, setReversedList] = useState(false);

    const cardsList = reversedList ? [...CARDS].reverse() : CARDS;

    return (
        <div>
            <Button
                variant="primary"
                onClick={() => setReversedList((prev) => !prev)}
            >
                Reverse the list
            </Button>
            {cardsList.map((card, index) => (
                // <Card key={index} id={index} {...card} /> // > index-key
                <Card key={card.id} {...card}>
                    Test test {index * 10}
                    <input id={`card-input-${card.id}`} type="text" />
                    <Badge variant={randomStatus(index)}>State</Badge>
                    <Button size="sm" variant={randomButton(index)}>
                        Move to next stage
                    </Button>
                </Card>
            ))}
        </div>
    );
}

export default CardList;
