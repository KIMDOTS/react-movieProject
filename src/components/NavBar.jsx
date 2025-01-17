import React from 'react';

const imageUrl = "https://image.tmdb.org/t/p/w500";

const NavBar = ({ movies }) => {

  // 내림차순 코드
  const sortedMovies = [...movies].sort((a, b) => b.vote_average - a.vote_average);

  // 상위 5개 영화만 선택
  const topMovies = sortedMovies.slice(0, 7);

  return (
    <header>
      <div>
        Movie Wiki
      </div>

      <nav className="bg-gray-800 text-white py-8 shadow-lg">
        <div>
          <h1 className="text-3xl font-bold mb-6 text-center">영화 평점순</h1>
          <ul className='flex flex-wrap justify-center gap-5'>
            {topMovies.map((movie) => (
              <li key={movie.id} className="text-center w-36">
                <img
                  className='w-full h-[300px] rounded-lg object-cover mb-3'
                  src={`${imageUrl}${movie.poster_path}`}
                  alt={movie.title}
                />
                <p className="text-sm font-medium">{movie.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;