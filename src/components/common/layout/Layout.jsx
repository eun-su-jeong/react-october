import { useSplitText } from '../../hooks/useSplitText';
import './Layout.scss';
import { useEffect, useRef } from 'react';

export default function Layout({ children, title }) {
	let newClass = title.toLowerCase().split(' ').join('_');
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splittext = useSplitText();

	useEffect(() => {
		splittext(refTitle, 0.2, 2);
		setTimeout(() => {
			refFrame.current.classList.add('on');
		}, 300);
	}, []);

	return (
		<section ref={refFrame} className={`layout ${newClass}`}>
			<h1 ref={refTitle}>{title}</h1>
			<div className='bar'></div>
			{children}
		</section>
	);
}
