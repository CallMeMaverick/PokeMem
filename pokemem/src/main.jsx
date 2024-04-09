import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/index.css"
import Header from "./components/header/Header.jsx";
import App from "./App.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Header />
        <App />

    </React.StrictMode>
);
