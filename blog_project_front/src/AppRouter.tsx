/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import PostList from './components/postList';
import PostCreate from './components/postCreate';
import PostFilter from './components/postFilter';
import ErrorPage from './components/error404';


const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/post" />} />
                <Route path='/post' element={< PostList />} />
                <Route path='/post/create' element={< PostCreate />} />
                <Route path='/post/:id' element={< PostFilter />} />
                <Route path='/error' element={< ErrorPage />} />
            </Routes>
        </Router>
    );
}

export default AppRouter;