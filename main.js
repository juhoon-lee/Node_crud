var http = require('http');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var mysql = require('mysql');
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'ju990120',
	database: 'webgrus',
});
db.connect();

let loginCheck = false;
let id = '';
let name = '';

var app = http.createServer(function (request, response) {
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;
	if (pathname === '/') {
		db.query(`SELECT * FROM board`, function (error, boards) {
			if (loginCheck === true) {
				var list = template.list(boards);
				var html = template.loginHTML(name, list);
				response.writeHead(200);
				response.end(html);
			} else {
				var list = template.list(boards);
				var html = template.HTML(list);
				response.writeHead(200);
				response.end(html);
			}
		});
	} else if (pathname === '/login') {
		const html = template.Login();
		response.writeHead(200);
		response.end(html);
	} else if (pathname === '/login_process') {
		let body = '';
		request.on('data', function (data) {
			body = body + data;
		});
		request.on('end', function () {
			const post = qs.parse(body);
			db.query(`SELECT id,pw,name FROM user`, function (error, result) {
				if (error) {
					throw error;
				}
				console.log(result);
				for (let i = 0; i < result.length; i++) {
					if (result[i].id === post.id && result[i].pw === post.password) {
						loginCheck = true;
					}
				}
				if (loginCheck === true) {
					id = post.name;
					response.writeHead(302, { Location: `/` });
					response.end();
				} else {
					response.writeHead(302, { Location: `/login` });
					response.end();
				}
			});
		});
	} else if (pathname === '/logout') {
		loginCheck = false;
		id = '';
		name = '';
		response.writeHead(302, { Location: `/` });
		response.end();
	} else if (pathname === '/sign') {
		const html = template.Sign();
		response.writeHead(200);
		response.end(html);
	} else if (pathname === '/sign_process') {
		var body = '';
		request.on('data', function (data) {
			body = body + data;
		});
		request.on('end', function () {
			var post = qs.parse(body);
			db.query(
				`INSERT INTO user (id,pw,name) VALUES(?, ?, ?)`,
				[post.id, post.password, post.name],
				function (error, result) {
					if (error) {
						throw error;
					}
					response.writeHead(302, { Location: `/` });
					response.end();
				}
			);
		});
	} else if (pathname === '/create') {
		const html = template.Create();
		response.writeHead(200);
		response.end(html);
	} else if (pathname === '/create_process') {
		let body = '';
		request.on('data', function (data) {
			body = body + data;
		});
		request.on('end', function () {
			const post = qs.parse(body);
			db.query(
				`
          INSERT INTO topic (title, description, created, author_id)
          VALUES(?, ?, NOW(), ?)`,
				[post.title, post.description, 1],
				function (error, result) {
					if (error) {
						throw error;
					}
					response.writeHead(302, { Location: `/?id=${result.insertId}` });
					response.end();
				}
			);
		});
	} else if (pathname === '/update') {
		db.query('SELECT * FROM topic', function (error, topics) {
			if (error) {
				throw error;
			}
			db.query(`SELECT * FROM topic WHERE id=?`, [queryData.id], function (error2, topic) {
				if (error2) {
					throw error2;
				}
				var list = template.list(topics);
				var html = template.HTML(
					topic[0].title,
					list,
					`
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${topic[0].id}">
            <p><input type="text" name="title" placeholder="title" value="${topic[0].title}"></p>
            <p>
            <textarea name="description" placeholder="description">${topic[0].description}</textarea>
            </p>
            <p>
            <input type="submit">
            </p>
          </form>
          `,
					`<a href="/create">create</a> <a href="/update?id=${topic[0].id}">update</a>`
				);
				response.writeHead(200);
				response.end(html);
			});
		});
	} else if (pathname === '/update_process') {
		var body = '';
		request.on('data', function (data) {
			body = body + data;
		});
		request.on('end', function () {
			var post = qs.parse(body);
			db.query(
				'UPDATE topic SET title=?, description=?, author_id=1 WHERE id=?',
				[post.title, post.description, post.id],
				function (error, result) {
					response.writeHead(302, { Location: `/?id=${post.id}` });
					response.end();
				}
			);
		});
	} else if (pathname === '/delete_process') {
		var body = '';
		request.on('data', function (data) {
			body = body + data;
		});
		request.on('end', function () {
			var post = qs.parse(body);
			db.query('DELETE FROM topic WHERE id = ?', [post.id], function (error, result) {
				if (error) {
					throw error;
				}
				response.writeHead(302, { Location: `/` });
				response.end();
			});
		});
	} else {
		response.writeHead(404);
		response.end('Not found');
	}
});
app.listen(3000);
