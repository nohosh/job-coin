import React, { useEffect, useState } from 'react';
import Chart from '../components/Chart';

function PostLogin({ data, logout, transaction }) {
	const [control, setControl] = useState(null);

	useEffect(() => {
		const handleKey = (event) => {
			if (event.keyCode === 27) {
				logout();
			}
		};
		window.addEventListener('keydown', handleKey);
		return () => {
			window.removeEventListener('keydown', handleKey);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const KeyControl = () => {
		const [amount, setAmount] = useState('');
		const [addr, setAddr] = useState('');
		const [err, setErr] = useState(false);

		const handleTransaction = () => {
			if (amount > data.balance) {
				setErr(true);
				return;
			}
			transaction(data.name, addr, amount);
		};

		if (control === 'T') {
			return (
				<>
					{data.transactions.length === 0 && <p>no transations yet</p>}
					<ul>
						{data.transactions.map((t) => (
							<div key={t.createdAt.getTime()}>
								{data.name === t.from ? (
									<li className="red">
										-${t.amount} to <b>{t.to.toUpperCase()}</b>
									</li>
								) : (
									<li className="green">
										+${t.amount} from <b>{t.from.toUpperCase()}</b>
									</li>
								)}
							</div>
						))}
					</ul>
				</>
			);
		} else if (control === 'P') {
			return (
				<>
					<input
						type="number"
						placeholder="Amount"
						value={amount}
						onChange={(e) => {
							setAmount(e.target.value);
							setErr(false);
						}}
					/>
					<input
						type="text"
						placeholder="Address"
						value={addr}
						onChange={(e) => {
							setAddr(e.target.value);
						}}
					/>
					<button className="button-transaction" onClick={handleTransaction}>
						SEND
					</button>
					{err && <span className="err">amount too high </span>}
				</>
			);
		} else if (control === 'G') {
			return (
				<>
					{data.transactions.length === 0 ? (
						<p>no transations yet</p>
					) : (
						<>
							<Chart data={data} />
						</>
					)}
				</>
			);
		}
	};
	return (
		<main>
			<span>
				press
				<span onClick={logout} className="escape">
					&#9243;
				</span>
				to logout
			</span>
			<h1>Welcome {data.name}</h1>
			<h4>
				Balance: <b>{data.balance} </b>🪙
			</h4>
			<div>
				<button onClick={() => setControl('T')}>TRANSACTIONS</button>
				<button onClick={() => setControl('P')}>PAY</button>
				<button onClick={() => setControl('G')}>STATS</button>
			</div>
			<KeyControl />
		</main>
	);
}

export default PostLogin;
