import React, { useState, useRef, useEffect } from 'react';

function Prelogin({ loginUser }) {
	const [input, setInput] = useState('');
	const inputRef = useRef();
	const handleLogin = () => {
		if (input === '') return;
		loginUser(input);
	};

	useEffect(() => {
		inputRef.current.focus();
	}, []);

	return (
		<main>
			<span>
				{input.length > 0 ? (
					<>
						press
						<span onClick={handleLogin} className="key-enter">
							⏎
						</span>
						to Login
					</>
				) : (
					<>enter your ADDRESS</>
				)}
			</span>
			<h1>Welcome to JOBCOIN</h1>
			<div>
				<input
					placeholder="Address"
					type="password"
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
					}}
					onKeyUp={(e) => {
						e.key === 'Enter' && handleLogin();
					}}
					ref={inputRef}
				/>
			</div>
		</main>
	);
}

export default Prelogin;
