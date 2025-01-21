
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router';
import axiosInstance from '../api/axiosInstance';

const DetailContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PosterImage = styled.img`
  width: 380px;
  height: 500px;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const DetailInfo = styled.div`
  max-width: 600px;

  h1 {
    font-size: 32px;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 24px;
    }
  }

  p {
    font-size: 18px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const imageUrl = "https://image.tmdb.org/t/p/w200";

const MovieDetail = () => {
  const { id } = useParams(); // URL에서 영화 ID 가져오기
  const [detailData, setDetailData] = useState(null); // 영화 상세 데이터를 저장할 상태

  useEffect(() => {
    const fetchMovieDetail = async () => {

      try {
        // const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`;
        const response = await axiosInstance.get(`/movie/${id}`, {
          params: {
            language: 'ko-KR', // 언어 설정
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
    return <p className="text-4xl font-bold text-center">로딩중...</p>;
  }

  return (
    <div className="bg-gray-800 text-white p-8">
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {/* 영화 포스터 이미지 */}
        <div className="w-full md:w-80 h-auto">
          <img
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform hover:scale-105"
            src={`${imageUrl}${detailData.poster_path}`}
            alt={detailData.title}
          />
        </div>

        {/* 영화 정보 */}
        <div className="flex flex-col gap-4 max-w-4xl w-full">
          <h1 className="text-4xl font-bold text-center md:text-left">{detailData.title}</h1>
          <div className="flex justify-center md:justify-start items-center space-x-1">
            {/* 별 아이콘 사용 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 12 12">
              <path fill="currentColor" d="M5.651 1.806a.375.375 0 0 1 .673 0l1.361 2.759a.13.13 0 0 0 .094.068l3.044.442c.308.045.43.423.208.64L8.828 7.862a.13.13 0 0 0-.036.11l.52 3.032a.375.375 0 0 1-.544.395L6.046 9.97a.13.13 0 0 0-.117 0l-2.722 1.43a.375.375 0 0 1-.544-.395l.52-3.031a.13.13 0 0 0-.036-.111L.944 5.715a.375.375 0 0 1 .208-.64l3.044-.442a.13.13 0 0 0 .094-.068z"></path>
            </svg>
            <span>{detailData.vote_average} / 10</span>
          </div>
          <p className="text-lg text-gray-200 text-center md:text-left">
            {detailData.genres && detailData.genres.map((genre) => (
              <span key={genre.id} className="bg-gray-700 text-sm px-2 py-1 rounded-md mr-2 mb-2 inline-block">
                {genre.name}
              </span>
            ))}
          </p>

          <p className="text-lg text-gray-200">
            <span className="font-semibold text-white" /> {detailData.overview || "상세 정보가 없습니다."}
          </p>

          {/* 추가적인 영화 정보 (예: 제작일, 언어 등) */}
          <div className="flex gap-4 mt-4 text-sm text-gray-300">
            <p><span className="font-semibold">개봉일 :</span> {detailData.release_date}</p>
            <p><span className="font-semibold">언어 :</span> {detailData.original_language.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;