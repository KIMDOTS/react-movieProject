import React, { useState } from 'react';

const NavBar = ({ movies }) => {
  const [query, setQuery] = useState(''); // 검색어 상태

  const handleSearch = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    const value = event.target.value;
    setQuery(value); // 검색어 상태 업데이트
  };

  return (
    <nav className='flex justify-between items-center my-[10px]'>
      <span className='text-xl font-bold px-[10px]'>Movie Wiki</span>
      <form onSubmit={handleSearch}>
        <input
          className='w-[300px]'
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch} // 입력값을 변경하는 이벤트 핸들러
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <button className='bg-gray-800 mx-[3px] text-white rounded-[4px]'>
          Log-in
        </button>
        <button className='bg-gray-800 mx-[3px] text-white rounded-[4px]'>
          Sign-up
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
