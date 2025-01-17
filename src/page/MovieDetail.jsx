import React, { useEffect, useState } from 'react';

const imageUrl = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const [detailData, setDetailData] = useState({});

  useEffect(() => {
    fetch('/src/assets/data/movieDetailData.json')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setDetailData(data)
      })
  }, []);

  return (
    <div className='flex justify-center space-x-4'>
      <div>
        <img className="w-[380px] h-[500px] rounded-[2px]" src={`${imageUrl}${detailData.poster_path}`} alt={detailData.title} />
      </div>
      <div className='flex flex-col justify-start'>
        <p className="text-3xl font-bold mb-4">{detailData.title}</p>
        <p className="text-xl mb-2">평점 : {detailData.vote_average}</p>
        <p className="text-base mb-4">
          {detailData.genres && detailData.genres.map((genre) => (
            <span key={genre.id}>{genre.name} </span>
          ))}
        </p>
        <p className="text-base max-w-[500px]">{detailData.overview}</p>
      </div>
    </div >
  );
};

export default MovieDetail;


