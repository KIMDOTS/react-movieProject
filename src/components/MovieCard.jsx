import React from 'react';
import { Link } from 'react-router-dom';

const imageUrl = "https://image.tmdb.org/t/p/w200";

const MovieCard = ({ movie }) => {
  return (
    <div>
      {/* 상세정보 페이지로 이동할 수 있게 링크 사용 */}
      <Link to={`/details/${movie.id}`}>
        <img className='w-full h-[300px] rounded-[8px]' src={`${imageUrl}${movie.poster_path}`} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>평점 : {movie.vote_average}</p>
      </Link>
    </div>
  );
};

export default MovieCard;