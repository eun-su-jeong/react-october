import './Modal.scss';
import { useEffect, useState } from 'react';

export default function Modal({ IsOpen, setIsOpen, children }) {
	useEffect(() => {
		document.body.style.overflow = IsOpen ? 'hidden' : 'auto';
	}, [IsOpen]);

	return (
		<>
			{IsOpen && (
				<aside className='modal'>
					<div className='con'>{children}</div>
					<span onClick={() => setIsOpen(false)}>close</span>
				</aside>
			)}
		</>
	);
}
