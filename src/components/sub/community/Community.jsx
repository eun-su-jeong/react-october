import './Community.scss';
import Layout from '../../common/layout/Layout';
import { useRef } from 'react';
import { TfiWrite } from 'react-icons/tfi';
import { ImCancelCircle } from 'react-icons/im';

function Community() {
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='title' ref={refInput} />
					<textarea cols='30' rows='3' placeholder='leave message' ref={refTextarea}></textarea>

					<nav>
						<button>
							<ImCancelCircle fontSize={20} color={'#555'} />
						</button>
						<button>
							<TfiWrite fontSize={20} color={'#555'} />
						</button>
					</nav>
				</div>

				<div className='showBox'></div>
			</div>
		</Layout>
	);
}

export default Community;

/*
  Create (글작성) "POST"
  Read (글 불러오기) "GET"
  Updated (글 수정) "PUT"
  Delete (글 삭제) "DELETE"

  Restful API : DB의 구조적으로 변경하기 위한 개발 방법론

  로컬저장소: LocalStorage 
  - 모든 브라우저가 내장하고 있는 결량의 저장공간
  - 문자값만 저장가능 (5MB)
  - 객체값을 문자화 시켜서 저장
  - 로컬저장소 값을 불러올때는 반대로 문자형태를 JSON형태로 객체로 parcing해서 가져옴
*/
