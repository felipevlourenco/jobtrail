import { useState } from 'react';
import './App.css';
import CardList from './playground/CardList';

function App() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

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
            <CardList />
        </main>
    );
}

export default App;
