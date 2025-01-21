import React from 'react';
import { Link } from 'react-router';

const imageUrl = "https://image.tmdb.org/t/p/w200";

const MovieCard = ({ movie }) => {
  return (
    <div>
      {/* id를 파라미터로 받아 영화 상세정보 페이지로 이동할 수 있게 링크 사용 */}
      <Link to={`/details/${movie.id}`}>
        <img className='w-full h-[350px] rounded-[6px]' src={`${imageUrl}${movie.poster_path}`} alt={movie.title} />
        <h1>{movie.title}</h1>
        <div className="flex items-center space-x-1">
          {/* 별 아이콘 사용 */}
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 12 12">
            <path fill="currentColor" d="M5.651 1.806a.375.375 0 0 1 .673 0l1.361 2.759a.13.13 0 0 0 .094.068l3.044.442c.308.045.43.423.208.64L8.828 7.862a.13.13 0 0 0-.036.11l.52 3.032a.375.375 0 0 1-.544.395L6.046 9.97a.13.13 0 0 0-.117 0l-2.722 1.43a.375.375 0 0 1-.544-.395l.52-3.031a.13.13 0 0 0-.036-.111L.944 5.715a.375.375 0 0 1 .208-.64l3.044-.442a.13.13 0 0 0 .094-.068z"></path>
          </svg>
          <span>{movie.vote_average}</span>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;



