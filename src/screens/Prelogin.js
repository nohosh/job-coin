import React, { useState } from 'react';

function Prelogin({ loginUser }) {
	const [input, setInput] = useState('');
	const handleLogin = () => {
		if (input === '') return;
		loginUser(input);
	};
	return (
		<div>
			<input
				type="text"
				value={input}
				onChange={(e) => {
					setInput(e.target.value);
				}}
				placeholder="what's the address.."
			/>
			<button onClick={handleLogin}>login</button>
		</div>
	);
}

export default Prelogin;
