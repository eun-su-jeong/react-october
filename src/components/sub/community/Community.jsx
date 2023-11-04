import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { ImCancelCircle } from 'react-icons/im';
import { useRef, useState, useEffect } from 'react';

function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('posts');

		if (data) return JSON.parse(data);
		else return [];
	};
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const [Posts, setPosts] = useState(getLocalData());
	console.log(Posts);

	const resetPost = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};

	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			return alert('제목과 내용을 입력해 주세요');
		}
		// 현재 전세계 표준 시간값에서 grtTime()을 호출하면 표준 시간값을 밀리세컨드단위릐 숫자값으로 반환
		// 표준시간값에 한국시간에 9시간 빠르므로 9시간에 대한 밀리센컨드값을 더해줌 (korTime)
		// korTime : 한국시간대를 밀리세컨드로 반환한 값
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;

		// new Date(한국밀리센컨드시간값) -> 한국 시간값을 기준으로해서 시간객체값 반환

		setPosts([{ title: refInput.current.value, content: refTextarea.current.value, date: new Date(korTime) }, ...Posts]);
		resetPost();
	};

	const deletePost = (delIndex) => {
		console.log(delIndex);
		// Posts.filter로 전달되는 삭제 순번과 현재 반복되는 값의 순번이 같지가 않은 것만 배열로 반환 (삭제순번값만 제외하고 반환하기 때문에 결과적으로 삭제와 동일한 기능)
		// 삭제 순번글만 제외한 나머지 배열값을 다시 setPosts로 기존 Posts값을 변경하면 컴포넌트가 재랜더링되면서 해당 글만 제외한 나머지글만 출력
		// 해당 구문에서는 filter 자체가 불변성의 유지하면서 새로운 배열을 리턴하기 때문에 굳이 전개연산자로 기존 state값을 deep copy할 필요가 없음
		setPosts(Posts.filter((_, idx) => delIndex !== idx));
	};

	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='title' ref={refInput} />
					<textarea cols='30' rows='3' placeholder='leave message' ref={refTextarea}></textarea>

					<nav>
						<button onClick={resetPost}>
							<ImCancelCircle fontSize={20} color={'#555'} />
						</button>
						<button onClick={createPost}>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'>
					{Posts.map((post, idx) => {
						//현재시간값이 State에 옮겨담아지는 순간에는 객체값이고
						//다음번 렌더링 싸이클에서 useEffect에 의해 문자로 변환된다음 로컬저장소에 저장됨
						//날짜값을 받는 첫번째 렌더링 타임에는 날짜값이 객체이므로 split구문에서 오류발생
						//해결방법은 처음 렌더링을 도는 시점에서 날짜를 강제로 문자화한다음 출력처리
						const stringDate = JSON.stringify(post.date);
						const textedDate = stringDate.split('T')[0].split('"')[1].split('-').join('.');
						return (
							<article key={idx}>
								<div className='txt'>
									<h2>{post.title}</h2>
									<p>{post.content}</p>
									<span>{textedDate} </span>
								</div>
								<nav>
									<button>Edit</button>
									<button onClick={() => deletePost(idx)}>Delete</button>
								</nav>
							</article>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}

export default Community;

/*
	글 수정 로직단계
	1. 각 포스트에서 수정 버튼 클릭시 해당 객체에 enableUpdate=true라는 프로퍼티추가후 state저장
	2. 반복돌며 렌더링시 반복도는 객체에 enableUpdate값이 true명 제목, 본문을 폼요소 출력하도록 분기처리
	3. 수정모드일때는 수정취소, 수정완료 버튼 생성
	4. 수청취소버튼 클릭시 출력모드로 변경 (enableUpdate = false처리)
	5. 수정완료버튼 클릭시 수정모드에 있는 value값을 가져와서 state에 저장한뒤 다시 출력모드로 변경처리
*/
