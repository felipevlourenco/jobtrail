import { Button, Dialog } from '@repo/ui';
import { useState } from 'react';
import './App.css';
import ApplicationForm from './Application/ApplicationForm';
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
            <div style={{ margin: '16px 0px' }}>
                <Button variant="primary" size="md" onClick={handleThemeChange}>
                    Toggle theme
                </Button>
                <Dialog
                    onOpenChange={(isOpen) =>
                        console.log(isOpen ? 'abriu' : 'fechou')
                    }
                >
                    <Dialog.Trigger>New Application</Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Title>New Application</Dialog.Title>
                        <ApplicationForm onSubmit={() => {}} />
                    </Dialog.Content>
                </Dialog>
            </div>
            <CardList />
        </main>
    );
}

export default App;
