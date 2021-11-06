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
let author = '';
let name = '';

var app = http.createServer(function (request, response) {
	var _url = request.url;
	var queryData = url.parse(_url, true).query;
	var pathname = url.parse(_url, true).pathname;
	if (pathname === '/') {
		if (queryData.id === undefined) {
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
		} else {
			if (loginCheck === true) {
				db.query(`SELECT * FROM board WHERE id=?`, [queryData.id], function (error, boards) {
					db.query(
						`SELECT * FROM comment WHERE board_id=?`,
						[queryData.id],
						function (error, comments) {
							if (error) {
								throw error;
							}
							const comentList = template.Cmlist(comments);
							const html = template.LoginShowBoard(boards, comentList);
							response.writeHead(200);
							response.end(html);
						}
					);
				});
			} else {
				db.query(`SELECT * FROM board WHERE id=?`, [queryData.id], function (error, boards) {
					db.query(
						`SELECT * FROM comment WHERE board_id=?`,
						[queryData.id],
						function (error, comments) {
							if (error) {
								throw error;
							}
							const comentList = template.Cmlist(comments);
							const html = template.ShowBoard(boards, comentList);
							response.writeHead(200);
							response.end(html);
						}
					);
				});
			}
		}
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
				for (let i = 0; i < result.length; i++) {
					if (result[i].id === post.id && result[i].pw === post.password) {
						loginCheck = true;
						author = result[i].id;
					}
				}
				if (loginCheck === true) {
					name = post.id;
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
		author = '';
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
          INSERT INTO board (title, text, author)
          VALUES(?, ?, ?)`,
				[post.title, post.text, author],
				function (error, result) {
					if (error) {
						throw error;
					}
					console.log(author);
					response.writeHead(302, { Location: `/?id=${result.insertId}` });
					response.end();
				}
			);
		});
	} else if (pathname === '/update') {
		var body = '';
		request.on('data', function (data) {
			body = body + data;
		});
		request.on('end', function () {
			var post = qs.parse(body);
			db.query(`SELECT * FROM board WHERE id=?`, [post.id], function (error, boards) {
				if (boards[0].author === author) {
					const html = template.Update(boards);
					response.writeHead(200);
					response.end(html);
				} else {
					response.writeHead(302, { Location: `/?id=${post.id}` });
					response.end();
				}
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
				'UPDATE board SET title=?, text=? WHERE id=?',
				[post.title, post.text, post.id],
				function (error, result) {
					if (error) {
						throw error;
					}
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
			if (post.author === author) {
				db.query('DELETE FROM board WHERE id=?', [post.id], function (error, result) {
					if (error) {
						throw error;
					}
					response.writeHead(302, { Location: `/` });
					response.end();
				});
			} else {
				response.writeHead(302, { Location: `/?id=${post.id}` });
				response.end();
			}
		});
	} else if (pathname === '/comment_process') {
		var body = '';
		request.on('data', function (data) {
			body = body + data;
		});
		request.on('end', function () {
			var post = qs.parse(body);
			db.query(
				'INSERT INTO comment(comment,author,board_id) VALUES(?, ?, ?)',
				[post.comment, author, post.id],
				function (error, result) {
					if (error) {
						throw error;
					}
					response.writeHead(302, { Location: `/?id=${post.id}` });
					response.end();
				}
			);
		});
	} else {
		response.writeHead(404);
		response.end('Not found');
	}
});
app.listen(3000);
