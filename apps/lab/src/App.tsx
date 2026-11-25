import { Button, Tabs, ToastProvider, useLocalStorage } from '@jobtrail/ui';
import { useEffect, useReducer, useState } from 'react';
import './App.css';
import Board from './pages/Board/Board';
import List from './pages/List/List';
import boardReducer, { type BoardItem } from './store/boardReducer';

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

    // Shared by Board and List: both stay mounted inside the tabs.
    const { getValue, setValue } = useLocalStorage<BoardItem[]>('board', []);
    const [state, dispatch] = useReducer(boardReducer, {
        items: getValue() || [],
    });

    useEffect(() => {
        setValue(state.items);
    }, [state.items]);

    // Theme CSS targets <html> (:root[data-theme="dark"]), not a nested element.
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    const handleThemeChange = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        setInitialTheme(newTheme);
    };

    return (
        <ToastProvider>
            <main>
                <div style={{ margin: '16px 0px' }}>
                    <Button
                        variant="primary"
                        size="md"
                        onClick={handleThemeChange}
                    >
                        Toggle theme
                    </Button>
                </div>
                <Tabs defaultValue="board" className="app--tabs">
                    <Tabs.List aria-label="View">
                        <Tabs.Tab value="board">Board</Tabs.Tab>
                        <Tabs.Tab value="list">List</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="board" className="app--panel">
                        <Board items={state.items} dispatch={dispatch} />
                    </Tabs.Panel>
                    <Tabs.Panel value="list" className="app--panel">
                        <List items={state.items} />
                    </Tabs.Panel>
                </Tabs>
            </main>
        </ToastProvider>
    );
}

export default App;
