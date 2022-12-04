import bodyParser from 'body-parser';
import express from "express";
import * as fs from 'fs';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const highlightMatch = (searchQuery: string, text: string): string => {
	const regex = new RegExp(`${searchQuery}`, 'gimu');
	const regexResult = text.matchAll(regex);
	let remainingText = text;
	let result = '';

	for (const match of regexResult) {
		const head = remainingText.slice(0, match.index);
		const middle = match[0];
		remainingText = remainingText.slice(head.length + middle.length);

		result += head + `<b style="color: blue; text-decoration:  underline;">${middle}</b>`;
	}

	result += remainingText;

	return result;
}

const renderSearchPage = (searchQuery: string, results: string[]): string => {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Regex Injection</title>
</head>
<body>
	<form method="post">
		<textarea name="t" placeholder="Search reviews...">${searchQuery}</textarea>
		<input type="submit" value="Search" />
	</form>
	<div>
		${
		results.map(
			text => `<p style="border: 1px solid black">${highlightMatch(searchQuery, text)}</p>`
		).join('')
	}
	</div>
</body>
</html>
	`
};

app.get('/', (req, res) => {
	return res.send(renderSearchPage('', []));
});

app.post('/', async (req, res) => {
	const { t } = req.body as any;

	if (typeof t !== 'string') {
		return res.sendStatus(400);
	}

	try {
		const data = await fs.promises.readFile('data/aclImdb.txt', { encoding: 'utf-8' });
		const regex = new RegExp(`^.*${t}.*$`, 'gimu');
		const regexResult = data.matchAll(regex);

		if (regexResult === null) {
			return res.send(renderSearchPage(t, ["No matches"]));
		}

		return res.send(renderSearchPage(t, [ ...regexResult ].map(result => result[0])))
	} catch {
		return res.sendStatus(500);
	}
});

app.listen(3000, () => {
	console.log('Started');
})
