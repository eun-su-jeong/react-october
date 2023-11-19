import React from 'react';

function Test() {
	return <div>Test</div>;
}

export default Test;

/*
  React에서의 메모이제이션
  리액트 컴포넌트안에서 컴포넌트가 재랜더링될때마다 불필요하게 호출되는 함수, 리턴값, 컴포넌트 자체를 메모리에 강제등록해서 재랜더링시 메모리에 등록된 값을 재활용하기 위한 성능향상 방법

  React에서 메모이제이션 처리시 주의점
  - 성능향상을 위해서 메모리 점유율을 늘리는 등가교환 방식
  - 메모이제이션 처리된 값들을 garbage collector에서 제외 됨

  Garbage collector
  - 자바스크립트 내부에서 안쓰는 메모리를 정기적으로 제거해주는 메모리 관리자

  memo - 특정 컴포넌트 자체를 메모이제이션
  useCallback - 컴포넌트 안쪽의 특정 행들러함수를 메모이제이션
  useMemo - 특정 함수가 반환하는 값 자체를 메모이제이션
*/
