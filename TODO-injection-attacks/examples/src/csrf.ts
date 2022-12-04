import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as crypto from 'crypto';
import express from "express";
import mysql from "mysql2";
import { v4 } from 'uuid';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'csrf',
});
const query = async <TResult = void>(sql: string): Promise<TResult[]> => {
	return new Promise((resolve, reject) => {
		connection.query(sql, (err, result) => {
			if (err) {
				return reject(err);
			}

			return resolve(result as TResult[]);
		})
	});
};

interface Transaction {
	sender: string;
	recipient: string;
	amount: number;
}

interface Session {
	username: string;
	token: string;
}

interface User {
	username: string;
	password: string;
}

const renderLoginPage = (): string => {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CSRF</title>
</head>
<body>
	<form method="post">
		<input type="text" name="username" placeholder="Username" />
		<input type="password" name="password" placeholder="Password" />
		<input type="submit" value="Login" />
	</form>
</body>
</html>
	`;
};

app.get('/', async (req, res) => {
	return res.send(renderLoginPage());
});

app.post('/', async (req, res) => {
	const { username, password } = req.body as any;
	const passwordHash = crypto.createHash('md5').update(password).digest('hex');

	try {
		const users = await query<User>(`SELECT * FROM users WHERE username = "${username}" AND password = "${passwordHash}"`);

		if (users.length !== 1) {
			return res.send(renderLoginPage());
		}

		const token = v4();

		await query(`INSERT INTO sessions (username, token) VALUES ("${username}", "${token}")`);

		res.cookie('sessionToken', token).redirect('/transactions');
	} catch (e) {
		console.log(e);
		return res.send(renderLoginPage());
	}
});

const renderTransactionsPage = (transactions: Transaction[]): string => {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>CSRF</title>
</head>
<body>
	<form method="post">
		<input type="text" name="recipient" placeholder="Recipient" />
		<input type="number" name="amount" placeholder="Amount" />
		<input type="submit" value="Transfer funds" />
	</form>
	<div>
		${
		transactions.map(
			transaction => `<p>${transaction.sender} -- ${transaction.amount} € --> ${transaction.recipient}</p>`
		).join('')
	}
	</div>
</body>
</html>
	`;
};

app.get('/transactions', async (req, res) => {
	const sessionToken = req.cookies.sessionToken;

	if (sessionToken === undefined) {
		return res.send(renderLoginPage());
	}

	const sessions = await query<Session>(`SELECT * FROM sessions WHERE token = "${sessionToken}"`);

	if (sessions.length === 0) {
		return res.send(renderLoginPage());
	}

	const { username } = sessions[0];

	const transactions = await query<Transaction>(`SELECT * FROM transactions WHERE sender = "${username}" OR recipient = "${username}"`);

	res.send(renderTransactionsPage(transactions));
});


app.post('/transactions', async (req, res) => {
	const sessionToken = req.cookies.sessionToken;

	if (sessionToken === undefined) {
		console.log('DENIED: NO TOKEN');
		return res.send(renderLoginPage());
	}

	const sessions = await query<Session>(`SELECT * FROM sessions WHERE token = "${sessionToken}"`);

	if (sessions.length === 0) {
		console.log('DENIED: WRONG TOKEN');
		return res.send(renderLoginPage());
	}

	const { username } = sessions[0];
	const { recipient, amount } = req.body as any;

	await query(`INSERT INTO transactions (sender, recipient, amount) VALUES ("${username}", "${recipient}", "${amount}")`);
	console.log('GRANTED');

	const transactions = await query<Transaction>(`SELECT * FROM transactions WHERE sender = "${username}" OR recipient = "${username}"`);

	res.send(renderTransactionsPage(transactions));
});

app.listen(3000, () => {
	console.log('Started');
})
