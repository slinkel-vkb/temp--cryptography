import jwt from 'jsonwebtoken';

const secretKey = 'secretKey';

const data = {
	iss: 'ich',
	foo: 'bar'
};

const token = jwt.sign(data, secretKey, { algorithm: 'HS256' });

console.log({ token });
