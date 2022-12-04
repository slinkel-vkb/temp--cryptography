import bodyParser from "body-parser";
import express from "express";
import mysql from "mysql2";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'xss',
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

interface Message {
	text: string;
	timestamp: Date;
}

const renderMessageBoard = (messages: Message[]): string => {
	const sortedMessages = messages.sort(
		(left, right) => left.timestamp.getTime() - right.timestamp.getTime()
	);

	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>XSS</title>
</head>
<body>
	<form method="post">
		<textarea name="message" placeholder="Publish message"></textarea>
		<input type="submit" value="Send" />
	</form>
	<div>
		${
			sortedMessages.map(
				message => `<p>${message.text}</p>`
			).join('')
		}
	</div>
</body>
</html>
	`;
};

app.get('/', async (req, res) => {
	const messages = await query<Message>('SELECT * FROM messages');

	return res.send(renderMessageBoard(messages));
});

app.post('/', async (req, res) => {
	const { message } = req.body;

	try {
		await query(`INSERT INTO messages (text, timestamp) VALUES ("${message}", NOW())`);
	} catch (ex: unknown) {
		if (ex instanceof Error) {
			return res.status(500).send(ex.message);
		}

		return res.sendStatus(500);
	}

	const messages = await query<Message>('SELECT * FROM messages');

	return res.send(renderMessageBoard(messages));
});

app.listen(3000, () => {
	console.log('Started');
})
