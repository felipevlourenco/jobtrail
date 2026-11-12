import { useState } from 'react';
import './App.css';
import CardList from './playground/CardList';

type Theme = 'light' | 'dark';
const THEME_KEY = 'theme';

const getInitialTheme = (): Theme => {
    if (window.localStorage) {
        const theme = localStorage.getItem(THEME_KEY);

        if (theme !== null) {
            return theme as Theme;
        }
    }

    return 'light';
};

const setInitialTheme = (theme: Theme) => {
    if (window.localStorage) {
        localStorage.setItem(THEME_KEY, theme);
    }
};

function App() {
    const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

    const handleThemeChange = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setInitialTheme(newTheme);
    };

    return (
        <main data-theme={theme}>
            <div>
                <button onClick={handleThemeChange}>Toggle theme</button>
            </div>
            <CardList />
        </main>
    );
}

export default App;
