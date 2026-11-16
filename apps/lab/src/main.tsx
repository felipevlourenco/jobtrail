import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import '@jobtrail/tokens/tokens.css';
import '@jobtrail/tokens/theme-light.css';
import '@jobtrail/tokens/theme-dark.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
