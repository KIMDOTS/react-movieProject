import React from 'react';

const imageUrl = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  return (
    <div>
      <img className='w-full h-[300px] rounded-[8px]' src={`${imageUrl}${movie.poster_path}`} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>평점: {movie.vote_average}</p>
    </div>
  );
};

export default MovieCard;