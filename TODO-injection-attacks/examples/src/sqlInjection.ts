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
	database: 'sqlInjection',
});

app.get('/', (req, res) => {
	res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SQL Injection</title>
</head>
<body>
    <form method="post">
        <textarea name="searchQuery" placeholder="Suchen..."></textarea>
        <input type="submit" value="Search" />
    </form>
</body>
</html>
	`);
});

const formatProduct = (product: Record<string, any>) => {
	return Object.entries(product).map(
		([key, value]) => `<b>${key}</b>: ${value}`
	).join(', ');
}

app.post('/', (req, res) => {
	const { searchQuery } = req.body;
	const sqlQuery = `SELECT * FROM products WHERE name LIKE '%${searchQuery}%'`;

	connection.query(
		sqlQuery,
		(err, results) => {
			res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>SQL Injection</title>
</head>
<body>
	<form method="post">
		<textarea name="searchQuery">${searchQuery}</textarea>
		<input type="submit" value="Search" />
	</form>
	<p>${sqlQuery}</p>
	<p>${err}</p>
	<ul>
		${
				((results ?? []) as any[]).map(
					result => `<li>${ formatProduct(result) }</li>`
				)
			}
	</ul>
</body>
</html>
	`);
		}
	);
});

app.listen(3000, () => {
	console.log('Started');
})
