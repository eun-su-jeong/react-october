import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import { useMedia } from './components/hooks/useMedia';
import Visual from './components/main/visual/Visual';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Community from './components/sub/community/Community';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Detail from './components/sub/youtube/Detail';
import Youtube from './components/sub/youtube/Youtube';
import './styles/Variable.scss';
import './styles/Global.scss';
import { Route, Switch } from 'react-router-dom';
import MainWrap from './components/main/mainWrap/MainWrap';
import Parent from './Parent';
import { useState } from 'react';

function App() {
	const [IsDark, setIsDark] = useState(true);
	return (
		<main className={`wrap ${useMedia()} ${IsDark ? 'dark' : ''}`}>
			{/* <Parent /> */}
			{/* 중첩된 라우터로 복수개의 동일한 컴포넌트가 연결될때 처음 연결라우터만 호출하고 나머지는 무시 */}
			<Switch>
				<Route exact path='/'>
					<Header isMain={true} IsDark={IsDark} setIsDark={setIsDark} />
					<MainWrap />
				</Route>
				<Route path='/'>
					<Header isMain={false} IsDark={IsDark} setIsDark={setIsDark} />
				</Route>
			</Switch>
			<Route path='/department' component={Department} />
			<Route path='/community' component={Community} />
			<Route path='/gallery' component={Gallery} />
			<Route path='/youtube' component={Youtube} />
			<Route path='/members' component={Members} />
			<Route path='/contact' component={Contact} />
			{/* 특정 URL 라우터 설정시 유튜브의 고유 아이디값을 params로 전달 zzzzzz*/}
			<Route path='/detail/:id' component={Detail} />
			<Footer />
		</main>
	);
}

export default App;
