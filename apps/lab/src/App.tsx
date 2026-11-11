import { Button } from '@repo/ui';
import { useState } from 'react';
import './App.css';

function App() {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    return (
        <div data-theme={theme}>
            <button
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
                Toggle theme
            </button>

            <Button>Primary button</Button>
        </div>
    );
}

export default App;
