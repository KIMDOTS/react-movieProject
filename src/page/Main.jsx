import React from 'react';
import MovieCard from '../components/MovieCard';
import Slide from '../components/Slide';

const Main = ({ movies }) => {
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
    </main>
  );
};

export default Main;
