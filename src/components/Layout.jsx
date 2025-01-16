import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

const Layout = ({ movies }) => {
  return (
    <div>
      <NavBar movies={movies} />

      {/* Outlet을 사용하여 각 페이지 라우트를 렌더링 */}
      <Outlet />
    </div>
  );
};

export default Layout;
