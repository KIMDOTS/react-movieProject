import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3', // 기본 API URL
  timeout: 1000, // 요청 제한 시간 설정 (ms 단위)
  headers: {
    accept: 'application/json', // 서버로부터 어떤 형식의 데이터를 받고 싶은지를 명시하는 것
    Authorization: `Bearer ${import.meta.env.VITE_MOVIE_ACCESS_TOKEN}`, // 인증과 관련된 정보를 서버에 전달,  액세스 토큰 추가
  },
});

export default axiosInstance;