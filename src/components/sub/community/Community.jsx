import './Community.scss';
import Layout from '../../common/layout/Layout';
import { TfiWrite } from 'react-icons/tfi';
import { ImCancelCircle } from 'react-icons/im';
import { useRef, useState } from 'react';

function Community() {
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const [Posts, setPosts] = useState([]);
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
						<button onClick={creatPost}>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'>
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
*/

// 리턴문 안쪽에는 불변성유지를 위해서 forEach는 사용할 수 없다. 핸들러 함수 안에서는 사용 가능
