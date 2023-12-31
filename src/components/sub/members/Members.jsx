import Layout from '../../common/layout/Layout';
import { useDebounce } from '../../hooks/useDebounce';
import './Members.scss';
import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Members() {
	const history = useHistory();
	const initVal = useRef({
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		edu: '',
		gender: '',
		interest: [],
		comments: '',
	});
	const [Val, setVal] = useState(initVal.current);
	const [Errs, setErrs] = useState({});

	// 단기간에 자주바뀌는 state값을 useDebounce hook의 인수로 전달하면
	// debouncing이 적용된 새로운 state 반환
	const DebounceVal = useDebounce(Val);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let checkArr = [];
		const inputs = e.target.parentElement.querySelectorAll('input');

		inputs.forEach((input) => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const check = (value) => {
		const txt = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[!@#$%^&*()_+]/;

		console.log('check func called!!');
		const errs = {};
		//text 인증로직
		if (value.userid.length < 5) {
			errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		}
		//pwd1 인증로직
		if (value.pwd1.length < 5 || !txt.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errs.pwd1 = '비밀번호는 특수문자,영문,숫자포함해서 5글자 이상 입력하세요.';
		}
		//pwd2 인증로직
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 같게 입력하세요';
		}
		//textarea 인증로직
		if (value.comments.length < 10) {
			errs.comments = '남기는 말은 최소 10글자 이상 입력하세요.';
		}
		//radio버튼 인증로직
		if (!value.gender) {
			errs.gender = '성별을 선택해주세요.';
		}
		//select요소 인증로직
		if (!value.edu) {
			errs.edu = '최종학력을 선택해주세요.';
		}
		//checkbox인증로직
		if (value.interest.length === 0) {
			errs.interests = '취미를 하나이상 선택하세요.';
		}
		//email형식 인증로직
		if (!value.email || !/@/.test(value.email)) {
			errs.email = '이메일주소에는 @를 포함해야 합니다.';
		} else {
			const [forward, backward] = value.email.split('@');
			if (!forward || !backward) {
				errs.email = '@앞뒤로 문자값이 있어야 합니다.';
			} else {
				const [forward, backward] = value.email.split('.');
				if (!forward || !backward) {
					errs.email = '이메일 .앞뒤로 문자값이 있어야 합니다.';
				}
			}
		}

		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(check(Val)).length === 0) {
			alert('회원가입을 축하합니다.');
			history.push('/');
		}
	};

	useEffect(() => {
		// debouncing이 적용된 state를 의존성 배열에 등록하며
		// 해당 state가 계속 변경되는 중에는 호출을 막아주고
		// 변경이 끝나고 0.5초 지나야지만 호출됨
		setErrs(check(DebounceVal));
	}, [DebounceVal]);

	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>
				<div className='formBox'>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
									{/* userid, email (handleChange) */}
									<tr>
										<td>
											<input type='text' name='userid' placeholder='User ID' value={Val.userid} onChange={handleChange} />
											{Errs.userid && <p>{Errs.userid}</p>}
										</td>
										<td>
											<input type='text' name='email' placeholder='Email' value={Val.email} onChange={handleChange} />
											{Errs.email && <p>{Errs.email}</p>}
										</td>
									</tr>

									{/* pwd1, pwd2 (handleChange) */}
									<tr>
										<td>
											<input type='password' name='pwd1' placeholder='Password' value={Val.pwd1} onChange={handleChange} />
											{Errs.pwd1 && <p>{Errs.pwd1}</p>}
										</td>
										<td>
											<input type='password' name='pwd2' placeholder='Re-Password' value={Val.pwd2} onChange={handleChange} />
											{Errs.pwd2 && <p>{Errs.pwd2}</p>}
										</td>
									</tr>

									{/* edu (handleChange) */}
									<tr>
										<td colSpan='2'>
											<select name='edu' onChange={handleChange}>
												{/* 어차피 onChange이벤트가 연결되어 있으므로 value값으로 등록 */}
												<option value=''>Education</option>
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
											{Errs.edu && <p>{Errs.edu}</p>}
										</td>
									</tr>

									{/* gender (handleChange) */}
									<tr>
										<td colSpan='2'>
											<input type='radio' defaultValue='female' id='female' name='gender' onChange={handleChange} />
											<label htmlFor='female'>Female</label>

											<input type='radio' defaultValue='male' id='male' name='gender' onChange={handleChange} />
											<label htmlFor='male'>Male</label>
											{Errs.gender && <p>{Errs.gender}</p>}
										</td>
									</tr>

									{/* interests (handleCheck) */}
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' defaultValue='sports' onChange={handleCheck} />
											<label htmlFor='sports'>Sports</label>

											<input type='checkbox' name='interest' id='reading' defaultValue='reading' onChange={handleCheck} />
											<label htmlFor='reading'>Reading</label>

											<input type='checkbox' name='interest' id='music' defaultValue='music' onChange={handleCheck} />
											<label htmlFor='music'>Music</label>

											<input type='checkbox' name='interest' id='game' defaultValue='game' onChange={handleCheck} />
											<label htmlFor='game'>Game</label>
											{Errs.interests && <p>{Errs.interests}</p>}
										</td>
									</tr>

									{/* comments (handleChange) */}
									<tr>
										<td colSpan='2'>
											<textarea name='comments' cols='30' rows='5' placeholder='Leave a comment' value={Val.comments} onChange={handleChange}></textarea>
											{Errs.comments && <p>{Errs.comments}</p>}
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='reset' value='Cancel' />
											<input type='submit' value='Submit' />
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}

/*
	throttle vs debounce
	throttle : 물리적으로 핸들러함수 호출자체를 일정횟수로 줄임
	debounce : 특정 이벤트가 단시간에 반복으로 계속 발생하고 있으면 핸들러 함수 호출 자체를 계속 뒤로 밀면서 호출 막음
*/
