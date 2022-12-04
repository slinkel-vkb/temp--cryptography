import express from "express";
import * as fs from 'fs';

const app = express();

app.use(express.static('public'));

app.get('/image', async (req, res) => {
	const { fileName } = req.query;

	if (typeof fileName !== 'string') {
		return res.sendStatus(400);
	}

	const path = `public/${fileName}`;

	try {
		const image = await fs.promises.readFile(path, { encoding: 'binary' });
		return res.contentType('image/jpeg').end(image, 'binary');
	} catch  {
		return res.status(404).send(`${path} not found.`);
	}
});

app.listen(3000, () => {
	console.log('Started');
})
