import React from 'react';
import { Link } from 'react-router';

const imageUrl = "https://image.tmdb.org/t/p/w500";

const Slide = ({ movies }) => {

  // 내림차순 코드
  const sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);

  // 상위 5개 영화만 선택
  const topMovies = sortedMovies.slice(0, 5);

  return (
    <div>
      <div className="bg-gray-800 text-white py-8 shadow-lg">
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center">무비피디아 HOT 랭킹</h1>
          <ul className='flex flex-wrap justify-center gap-5'>
            {topMovies.map((movie) => (
              <li key={movie.id} className="text-center w-56">
                <Link to={`/details/${movie.id}`} className="group">
                  <img
                    className="w-full h-[300px] rounded-lg object-cover mb-3 transition-transform duration-150 ease-in-out group-active:scale-95"
                    src={`${imageUrl}${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <p className="text-lg font-medium group-active:text-gray-400 transition-colors duration-150">{movie.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Slide;
