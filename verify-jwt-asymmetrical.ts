import fs from 'fs';
import jwt from 'jsonwebtoken';

const publicKey = fs.readFileSync('./ec256-pub.pem', 'utf-8');

const token = process.argv[2];

const decoded = jwt.verify(token, publicKey, { algorithms: [ 'ES256' ], complete: true });

console.log({ decoded });
