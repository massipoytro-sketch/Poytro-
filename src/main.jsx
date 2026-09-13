import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import './styles/tokens.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';
import './styles/reference.css';
import './styles/chest.css';
import './styles/public.css';
import './styles/finish.css';

createRoot(document.getElementById('root')).render(<App />);
