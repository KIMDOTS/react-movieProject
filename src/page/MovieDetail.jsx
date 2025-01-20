import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const imageUrl = "https://image.tmdb.org/t/p/w200";

const MovieDetail = () => {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const accessToken = import.meta.env.VITE_MOVIE_ACCESS_TOKEN;
      const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;

      try {
        const response = await axios.get(url, {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setDetailData(response.data); // 상세 데이터 상태 업데이트
      } catch (error) {
        console.error('영화 상세 정보 요청 실패:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!detailData) {
    return <p>로딩 중...</p>;
  }

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


