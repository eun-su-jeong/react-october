import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { ImCancelCircle } from 'react-icons/im';
import { useRef, useState, useEffect } from 'react';

function Community() {
	// 순서1- 로컬저장소의 값을 가져와서 객체화한다음 리턴하는 함수
	const getLocalData = () => {
		const data = localStorage.getItem('posts');
		return JSON.parse(data);
	};
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	// 순서2- 컴포넌트가 마운트되자마자 로컬저장소에서 가져온 배열값을 Posts state에 옮겨담음
	const [Posts, setPosts] = useState(getLocalData());
	console.log(Posts);

	const resetPost = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};

	const creatPost = () => {
		// 기존의 Posts배열값을 Deep copy한 다음 새로운 객체값을 추가 (불변성 유지)
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			return alert('제목과 내용을 입력해 주세요');
		}
		setPosts([{ title: refInput.current.value, content: refTextarea.current.value }, ...Posts]);
		resetPost();
	};

	useEffect(() => {
		// 순서5- Posts값이 변경될때마다 해당값을 문자화해서 로컬저장소에 저장
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
						{/* 순서4- 글작성시 State값 변경처리 */}
						<button onClick={creatPost}>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'>
					{/* 순서3- 로컬저장소로부터 옮겨담아진 state값을 반복돌면서 글 목록 출력 */}
					{Posts.map((post, idx) => (
						<article key={idx}>
							<div className='txt'>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
							</div>
							<nav>
								<button>Edit</button>
								<button>Delete</button>
							</nav>
						</article>
					))}
				</div>
			</div>
		</Layout>
	);
}

export default Community;

/*
  Create (글작성) "POST"
  Read (글 불러오기) "GET"
  Update (글 수정) "PUT"
  Delete (글 삭제) "DELETE"

  Restful API : DB의 구조적으로 변경하기 위한 개발 방법론

  로컬저장소: LocalStorage 
  - 모든 브라우저가 내장하고 있는 결량의 저장공간
  - 문자값만 저장가능 (5MB)
  - 객체값을 문자화 시켜서 저장
  - 로컬저장소 값을 불러올때는 반대로 문자형태를 JSON형태로 객체로 parcing해서 가져옴

  localStorage 메서드
  localStorage.setItem('키', 문자화된 데이터) : 로컬저장소에 데이터 저장
  localStorage.getItem('키') : 해당 데이터는 문자값으로 리턴되기 때문에 다시 객체 형태로 parsing처리 필요
*/

// 리턴문 안쪽에는 불변성유지를 위해서 forEach는 사용할 수 없다. 핸들러 함수 안에서는 사용 가능
// 순서는 저장되는 순서인데...사실은 저장된 값이 있어야 하기때문에 순서가 맞지 않다. 만약 저장된 값이 없으면 오류가 생김
