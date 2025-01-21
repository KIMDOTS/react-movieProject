import React from 'react';
import styled from 'styled-components';
import MovieCard from '../components/MovieCard';
import Slide from '../components/Slide';

const MainContainer = styled.main`
  padding: 50px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const MovieList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

const LoadMoreButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) => (props.disabled ? '#007bff' : '#0056b3')};
  }

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

const Main = ({ movies, loadMoreMovies, loading }) => {
  console.log('영화 데이터:', movies); // 추가된 디버깅 코드
  return (
    <main>
      <Slide movies={movies} />
      <ul className='flex flex-wrap gap-5 px-[30px] py-[50px] justify-center'>
        {movies.map((movie) => (
          <li className="w-[calc(20%-20px)] box-border" key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>

      <div className="text-center my-5">
        <button
          onClick={loadMoreMovies}
          disabled={loading} // 데이터를 불러오는 동안 버튼을 disabled 처리하여 중복 요청 방지
          className="bg-blue-500 text-white px-5 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? "로딩 중..." : "더보기"}
        </button>
      </div>
    </main>
  );
};

export default Main;
