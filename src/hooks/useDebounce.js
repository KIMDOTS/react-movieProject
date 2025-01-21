import { useEffect, useState } from 'react';

// useDebounce : 특정 이벤트가 연속적으로 발생할 때 마지막 이벤트가 발생한 후 일정 시간이 지난 다음에만 실행되도록 제한하는 hooks
// 사용 이유 : 실시간으로 너무 많은 요청을 보내지 않기 위해 입력을 "지연 처리" 하는 것

function useDebounce(value, delay) { // value :  사용자가 입력한 값, delay : 디바운싱 시간
  const [debouncedValue, setDebouncedValue] = useState(value); // 최종적으로 반환될 값.

  // useEffect : 상태나 props가 변할 때마다 특정 작업을 수행할 수 있게 해주는 hook 
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value); // delay 후에 debouncedValue를  value 값으로 업데이트
    }, delay);

    // cleanup: 값이 바뀌거나 컴포넌트가 언마운트될 때 타이머를 정리 -> 불필요한 작업을 방지하고 메모리 누수를 막음
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  // 의존성 배열에 value만 넣었을 때의 문제
  // 의존성 배열에 value만 넣고 delay를 제외한다면, delay 값이 바뀌어도 useEffect는 이를 감지하지 못하고 실행되지 않음.

  return debouncedValue; // 디바운싱 된 값만 반환
}

export default useDebounce;
