import { useState } from 'react';
import { User } from '../class/user';
import { Transaction } from '../class/transaction';

const useData = (key, initialValue) => {
	const [user, setUser] = useState(null);
	const [data, setData] = useState({
		a: new User('a', []),
		b: new User('b', []),
		c: new User('c', []),
	});
	const createNewUser = (user) => {
		setData((prev) => ({ ...prev, [user]: new User(user, []) }));
	};
	const handleTransaction = (from, to, amount) => {
		if (from === to) return;
		const currData = data;
		const transaction = new Transaction(from, to, amount);
		const sender = currData[from];
		if (!(to in currData)) {
			currData[to] = new User(to, []);
		}
		const receiver = currData[to];

		sender.balance -= Number(amount);
		receiver.balance += Number(amount);
		sender.transactions.push(transaction);
		receiver.transactions.push(transaction);

		setData({ ...currData });
	};
	return [data, user, setUser, createNewUser, handleTransaction];
};
export default useData;
