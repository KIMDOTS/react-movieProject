import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useDebounce from '../hooks/useDebounce';
import { Link, useNavigate } from 'react-router-dom';

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const Logo = styled(Link)`
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: black;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  button {
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #555;
    }
  }
`;

const NavBar = ({ movies }) => {
  const [query, setQuery] = useState(''); // 검색창에 입력한 값을 저장하는 상태
  const debouncedQuery = useDebounce(query, 1000); // query가 입력되고 1000ms 후, debouncedQuery에 업데이트
  const navigate = useNavigate();

  // 검색창에서 입력이 바뀔 때마다 호출
  const handleSearch = (event) => {
    setQuery(event.target.value); // 검색어 상태 업데이트
  };

  // debouncedQuery가 변경되면 /search 페이지로 이동
  useEffect(() => {
    if (debouncedQuery) {
      navigate(`/search?query=${debouncedQuery}`);
    }
  }, [debouncedQuery]);

  return (
    <nav className='flex justify-between items-center my-[10px]'>
      <Link to="/" className='text-2xl font-bold text-gray-800 px-[10px]'>MOVIE PEDIA</Link>
      <form onSubmit={(e) => e.preventDefault()}> {/* 폼 제출 방지 */}
        <input
          className='w-[300px] focus:border-b-2 focus:border-gray-800 outline-none'
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleSearch} // 입력값을 변경하는 이벤트 핸들러
        />
        {/* <button type="submit">Search</button> useDebounce를 하기 때문에 필요없을 듯*/}
      </form>
      <div className="flex gap-2">
        <button className="text-[gray] px-4 py-2 rounded-lg hover:text-gray-800 transition-colors">
          로그인
        </button>
        <button className="text-gray-800 px-4 py-2 rounded-lg border-[1px] hover:bg-[lightgray] transition-colors">
          회원가입
        </button>
      </div>
    </nav>
  );
};

export default NavBar;