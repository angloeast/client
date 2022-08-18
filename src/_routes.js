import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/index';
import NotFound from './pages/404';
import Header from './components/Header';
import Footer from './components/Footer';

const Layout = () => {
  return (
    <div className="dark:bg-slate-900  dark:text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
