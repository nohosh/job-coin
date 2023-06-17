import { useState } from 'react';
import './App.css';
import PostLogin from './screens/PostLogin';
import Prelogin from './screens/Prelogin';
import useData from './hooks/useData';

function App() {
	const [data, user, setUser, createNewUser, handleTransaction] = useData();

	const loginUser = (user) => {
		if (!(user in data)) {
			createNewUser(user);
		}
		setUser(user);
	};

	return (
		<div className="App">
			{user ? <PostLogin /> : <Prelogin loginUser={loginUser} user={user} />}
		</div>
	);
}

export default App;
