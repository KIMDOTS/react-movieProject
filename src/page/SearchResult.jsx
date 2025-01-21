import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import MovieCard from '../components/MovieCard';

const imageUrl = "https://image.tmdb.org/t/p/w200";

const SearchResult = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // 현재 URL에서 query 파라미터를 추출
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query'); // 'query' 파라미터 가져오기

  // location.search는 URL에서 ?부터의 쿼리 문자열을 반환 
  // location.search → "?query=해리포터"
  // new URLSearchParams(location.search)는 location.search에서 나온 쿼리 문자열을 분석하여 쿼리 파라미터들을 다룰 수 있는 객체를 만듬.
  // new URLSearchParams(location.search).get('query') → "해리포터"

  useEffect(() => {
    if (!searchQuery) return; // 검색어가 없으면 검색하지 않음

    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/search/movie', {
          params: {
            query: searchQuery,
            language: 'ko-KR',
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('검색 결과 요청 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]); // searchQuery가 변경될 때마다 API 호출

  if (loading) {
    return <p className='text-center'>로딩중...</p>;
  }

  return (
    <div>
      {movies.length > 0 ? (
        <ul className="flex flex-wrap gap-5 px-[25px] py-[50px] justify-center">
          {movies.map((movie) => (
            <li key={movie.id} className="w-[calc(20%-20px)] box-border">
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-center'>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchResult;