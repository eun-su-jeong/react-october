import { useQuery } from "@tanstack/react-query";

const fetchMembers = async ({ queryKey }) => {
  try {
    const data = await fetch(`${process.env.PUBLIC_URL}/DB/department.json`);
    const json = await data.json();
    return json.members[queryKey[1]];
  } catch (err) {
    throw err;
  }
};

export const useMembersQuery = (num) => {
  //useQuery('queryKey', fetch func, {query option})
  //useQuery는 첫번째 쿼리키에 두번째 함수의 promise 반환값을 mapping하기 때문에
  //만약 중복 요청이 들어갈때 쿼리키가 동일하면 절대 refetching을 하지 않음
  //만약 동일 서버데이터에서 인수에 따라 다른 값을 refetching하게 하고 싶으면 인수로 전달된 값을
  //쿼리키의 배열 두번째 인수로 넘기면 인수에 값이 다르게 들어갈때마다 배열의 쿼리키값이 달라지므로 refetching가능해짐
  return useQuery(["fetchMembers", num], fetchMembers, {
    refetchOnMount: false, // 컴포넌트가 재마운트시 refecthing 금지 (false)
    refetchOnWindowFocus: false, // 윈도우에 포커스시 refecthing 금지
    cacheTime: 1000 * 10, // 서버데이터 요청시 캐시에 저장되는 시간 설정
    //다른 쿼리키가 들어가서 refetching을 해야될때 특정 데이터의 staleTime이 아직 남아있다면
    //fresh상태로 인지하기 때문에 refetching하지 않고 캐시에 등록된 값을 재활용
    staleTime: 1000 * 10, // 서버데이터 요청시 refetch금지 시간 설정
  });
};

// pending: 데이터 요청중인 상태
// frech: 최신데이터 상태 refetching을 안하는 상태)
// stale: 오래된 데이터 상태(refetching을 필요로 하는 상태)
// inactive: 현재 컴포넌트에 해당 서버 데이터를 쓰지 않는 상태

// 서버데이터가 fresh, stale상관없이 inactive 상태가 되면 그때 cacheTime이 소비되면서 GC에 의해서 데이터가 제거됨
// staleTime은 서버데이터의 fresh -> stale로 바뀌는 시간을 설정
// 데이터가 fresh상태면 데이터fetching요정이 들어가서 refetching하는 것이 아닌 캐시에 등롣된 값을 재활용
// 데이터가 stale상태면 데이터 요청시 다시 refetching처리
