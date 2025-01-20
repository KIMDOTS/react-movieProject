import React from 'react';
import MovieCard from '../components/MovieCard';
import Slide from '../components/Slide';

const Main = ({ movies, loadMoreMovies, loading }) => {
  console.log('영화 데이터:', movies); // 추가된 디버깅 코드
  return (
    <main>
      <Slide movies={movies} />
      <ul className='flex flex-wrap gap-5 px-[25px] py-[50px] justify-center'>
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
