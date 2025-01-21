import React from 'react';
import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

const Layout = ({ movies }) => {
  return (
    <div>
      <NavBar movies={movies} />
      <Outlet /> {/* Outlet을 사용하여 자식요소 페이지 라우트를 렌더링 */}
    </div>
  );
};

export default Layout;
