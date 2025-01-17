import { useEffect, useState } from 'react'
import './App.css'
import MovieCard from './components/MovieCard'
import MovieDetail from './page/MovieDetail';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Slide from './components/Slide';
import Main from './page/Main';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // fetch()는 JSON 파일을 가져오는 역할
    fetch('/src/assets/data/movieListData.json')
      // response.json()을 사용해서 JSON 형식으로 변환
      .then(response => response.json())
      //변환된 데이터(data.results)를 setMovies()를 이용해 movies 상태에 저장
      .then(data => {
        console.log(data);
        setMovies(data.results)
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main movies={movies} />} />
          <Route path='/details' element={<MovieDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
