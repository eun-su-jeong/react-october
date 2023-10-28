import './Modal.scss';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/*
  motion: 모션을 걸고싶은 JSX요소 앞쪽에 motion. 를 추가하면 initial, animate, exit라는 속성으로 모션설절 가능케하는 컴포넌트
  AnimatePresence : 모션을 적용할 컴포넌트의 Wrapping 컴포넌트 - 자식요소의 모션이 씉날때까지 언마운트 되는 시점을 holding처리
  적용가능한 모션 속성 : opacity, scale, rotate, x, y 
*/

export default function Modal({ IsOpen, setIsOpen, children }) {
	useEffect(() => {
		document.body.style.overflow = IsOpen ? 'hidden' : 'auto';
	}, [IsOpen]);

	return (
		<AnimatePresence>
			{IsOpen && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0, x: '100%' }} //JSX가 마운트되기 전상태의 스타일
					animate={{ opacity: 1, x: '0%' }} //JSX가 마운트된 후의 스타일
					exit={{ opacity: 0, x: '-100%' }} //JSX가 앞으로 언마운트될때의 스타일
					transition={{ duration: 1 }} //스타일이 변경될떄의 전환시간
				>
					<div className='con'>{children}</div>
					<span onClick={() => setIsOpen(false)}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
