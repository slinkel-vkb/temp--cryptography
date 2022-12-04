import jwt from 'jsonwebtoken';

const secretKey = 'secretKey';

const token = process.argv[2];

const decoded = jwt.verify(token, secretKey, { algorithms: [ 'HS256' ], complete: true });

console.log({ decoded });
