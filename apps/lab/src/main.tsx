import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import '@repo/tokens/tokens.css';
import '@repo/tokens/theme-light.css';
import '@repo/tokens/theme-dark.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
