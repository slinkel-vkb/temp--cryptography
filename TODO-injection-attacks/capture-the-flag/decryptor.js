const crypto = require('crypto');
const prompt = require('prompt');

const iv = Buffer.from([
	106, 119, 104, 155, 177,
	139, 175, 105,  61,  78,
	234,  83,  64, 232,  95,
	147
]);

prompt.start();
prompt.get(['ciphertext', 'key'], function (err, result) {
	if (err) {
		console.error(err);
		return;
	}

	const secret = Buffer.from(result.key, 'hex');
	const binary = Buffer.from(result.ciphertext, 'hex');
	const decipher = crypto.createDecipheriv('aes-256-cbc', secret, iv);

	console.log(Buffer.concat([decipher.update(binary), decipher.final()]).toString('utf-8'));
});

