import bodyParser from 'body-parser';
import { exec } from 'child_process';
import express from "express";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const renderPingPage = (url: string, pingOutput: string, isUp?: boolean): string => {
	const message = isUp
		? `<p>${url} is up!</p>`
		: isUp === undefined
			? ''
			: `<p>${url} is down :(</p>`;

	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Regex Injection</title>
</head>
<body>
	<form method="post">
		<textarea name="url" placeholder="Enter a URL...">${url}</textarea>
		<input type="submit" value="Is it down?" />
	</form>
	<div>
		${message}
		<pre>${pingOutput}</pre>
	</div>
</body>
</html>
	`
};

app.get('/', (req, res) => {
	return res.send(renderPingPage('', ''));
});

app.post('/', async (req, res) => {
	const { url } = req.body as any;

	if (typeof url !== 'string') {
		return res.sendStatus(400);
	}

	exec(`ping -c3 ${url}`, (err, stdout) => {
		if (err) {
			return res.send(renderPingPage(url, stdout, false));
		}
		return res.send(renderPingPage(url, stdout, true));

	});
});

app.listen(3000, () => {
	console.log('Started');
})
