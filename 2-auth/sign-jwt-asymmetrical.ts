import fs from 'fs';
import jwt from 'jsonwebtoken';

const privateKey = fs.readFileSync('./ec256-priv.pem', 'utf-8');

const data = {
	iss: 'ich',
	foo: 'bar'
};

const token = jwt.sign(data, privateKey, { algorithm: 'ES256' });

console.log({ token });
