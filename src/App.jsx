import { useEffect, useState } from 'react';
import './App.css';
import MovieDetail from './page/MovieDetail';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './page/Main';
import axiosInstance from './api/axiosInstance';
import SearchResult from './page/SearchResult';

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 페이지가 바뀔 때마다 API 요청을 보내는 useEffect
  useEffect(() => {
    fetchMovies(page);
  }, [page]); // page 바뀔 때마다 호출

  // 영화 데이터를 가져오는 함수
  const fetchMovies = async (pageNumber) => {
    setLoading(true); // 로딩 시작

    try {
      // axiosInstance 사용하여 get 요청 보내기
      const response = await axiosInstance.get('/discover/movie', {
        params: {
          include_adult: false,
          include_video: false,
          language: 'ko-KR',
          page: pageNumber,
          sort_by: 'popularity.desc',
        },
      });

      // 성인영화 필터링
      const filteredMovies = response.data.results.filter(movie => !movie.adult);

      // 기존 영화 목록에 추가
      setMovies(prevMovies => [...prevMovies, ...filteredMovies]);

    } catch (error) {
      console.error('API 요청 실패:', error);  // 오류 처리
    } finally {
      setLoading(false);  // 로딩 종료
    }
  };

  // 더보기 버튼 클릭 시 실행될 함수
  const loadMoreMovies = () => {
    const nextPage = page + 1; // 다음 페이지 번호
    setPage(nextPage);  // 페이지 상태 업데이트
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main movies={movies} loadMoreMovies={loadMoreMovies} loading={loading} />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path='/details/:id' element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;