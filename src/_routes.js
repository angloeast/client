import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/index.tsx';
import NotFound from './pages/404.tsx';
import Header from './components/Header';
import Footer from './components/Footer';
import Issues from './pages/issues/index';
import IssuesNew from './pages/issues/new';
import IssuesEdit from './pages/issues/edit';
import IssuesShow from './pages/issues/show';

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
        <Route index element={<Issues />} />
        <Route path="issues" element={<Issues />} />
        <Route path="issues/:id" element={<IssuesShow />} />
        <Route path="issues/:id/edit" element={<IssuesEdit />} />
        <Route path="issues/new" element={<IssuesNew />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
