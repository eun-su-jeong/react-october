import './Modal.scss';
import { useEffect, useState } from 'react';

export default function Modal(IsOpen, setIsOpen) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<>
			{IsOpen && (
				<aside className='modal'>
					<div className='con'>
						<span>close</span>
					</div>
				</aside>
			)}
		</>
	);
}
