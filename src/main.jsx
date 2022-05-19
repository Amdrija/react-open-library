import React from 'react';
import ReactDOM from 'react-dom/client';
import Search from './Search';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Book from './Book';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/books/:olid" element={<Book />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
