const mysql = require('mysql')
const connection = mysql.createConnection({
	host: 'mysql',
	user: 'root',
	password: 'password',
  database: 'test',
})

connection.connect();

connection.query(`SELECT * FROM users`, function (error, results, fields) {
  if (error) throw error;
  console.log(results)
})

connection.end();

