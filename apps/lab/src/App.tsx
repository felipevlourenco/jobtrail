import { Button, Card, type CardProps } from '@repo/ui';
import { useState } from 'react';
import './App.css';

const CARDS: Array<Pick<CardProps, 'title' | 'description'>> = Array.from(
    Array(10).keys(),
).map((i) => ({
    title: `Card ${i + 1}`,
    description: `description ${i + 1}`,
}));

function App() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [reversedList, setReversedList] = useState(false);

    const cardsList = reversedList ? [...CARDS].reverse() : CARDS;

    return (
        <main data-theme={theme}>
            <div>
                <button
                    onClick={() =>
                        setTheme(theme === 'light' ? 'dark' : 'light')
                    }
                >
                    Toggle theme
                </button>
            </div>
            <div>
                <Button onClick={() => setReversedList((prev) => !prev)}>
                    Reverse the list
                </Button>
                {cardsList.map((card) => (
                    <Card key={card.title} id={card.title} {...card} />
                ))}
            </div>
        </main>
    );
}

export default App;
