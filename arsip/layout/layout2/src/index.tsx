import { createRoot, Root } from 'react-dom/client';
import React from 'react';
import { App } from './App';
import "./umum.css";

let cont: HTMLElement = document.createElement('div');
cont.setAttribute('id', 'react-root');
document.body.appendChild(cont);

const root: Root = createRoot(cont);

root.render(<>
    <App></App>
</>);

