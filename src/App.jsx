import { useEffect, useState } from 'react';
import './App.css';
import MovieDetail from './page/MovieDetail';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './page/Main';
import axios from 'axios';

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

    const accessToken = import.meta.env.VITE_MOVIE_ACCESS_TOKEN;
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${pageNumber}&sort_by=popularity.desc`;

    try {
      // get 요청보내기
      const response = await axios.get(url, {
        headers: {
          accept: 'application/json',  // 서버로부터 어떤 형식의 데이터를 받고 싶은지를 명시하는 것
          Authorization: `Bearer ${accessToken}`, // 인증과 관련된 정보를 서버에 전달,  액세스 토큰 추가
        }
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
          <Route
            index
            element={<Main movies={movies} loadMoreMovies={loadMoreMovies} loading={loading} />}
          />
          <Route path='/details/:id' element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
