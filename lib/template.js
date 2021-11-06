module.exports = {
	HTML: function (list) {
		return `
    <!doctype html>
    <html>
    <head>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2>
      <h3><a href="/login">로그인</a></h3>
      <h3><a href="/sign">회원가입</a></h3>
      ${list}
    </body>
    </html>
    `;
	},
	loginHTML: function (name, list) {
		return `
    <!doctype html>
    <html>
    <head>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2>안녕하세요 ${name} 님</h2>
      <h4><a href='/logout'>로그아웃</a><h2>
      <h2><a href="/">메인으로</a></h2>
      ${list}
      <h3><a href='/create'>글쓰기<a><h3>
    </body>
    </html>
    `;
	},
	ShowBoard: (board, comments) => {
		return `
    <!doctype html>
    <html>
    <head>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body
      <h2><a href="/">메인으로</a></h2>
      <h1>${board[0].title}</h1>
      <p>${board[0].text}</p>
      ${comments}
    </body>
    </html>
    `;
	},
	LoginShowBoard: (board, comments) => {
		return `
    <!doctype html>
    <html>
    <head>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body
      <h2><a href="/">메인으로</a></h2>
      <h1>${board[0].title}</h1>
      <p>${board[0].text}</p>
      ${comments}
      <form action="/comment_process" method="post">
        <input type='hidden' name='id' value='${board[0].id}'>
        <textarea name='comment'></textarea>
        <input type="submit" value='댓글 작성'>
      </form>
      <form action="/delete_process" method="post">
        <input type='hidden' name='id' value='${board[0].id}'>
        <input type='hidden' name='author' value='${board[0].author}'>
        <input type="submit" value='삭제하기'>
      </form>
      <form action="/update" method="post">
        <input type='hidden' name='id' value='${board[0].id}'>
        <input type="submit" value='수정하기'>
      </form>
    </body>
    </html>
    `;
	},
	list: function (filelist) {
		var list = '<ul>';
		var i = 0;
		// console.log(filelist);

		while (i < filelist.length) {
			list =
				list +
				`<li><a href="/?id=${filelist[i].id}">제목: ${filelist[i].title} 작성자: ${filelist[i].author}</a></li>`;
			i = i + 1;
		}
		list = list + '</ul>';
		return list;
	},
	Cmlist: function (comments) {
		var list = '<ul>';
		var i = 0;
		for (let i = 0; i < comments.length; i++) {
			list += `<li>${comments[i].comment}      작성자: ${comments[i].author}</a></li>`;
		}
		list += '</ul>';
		return list;
	},
	Login: function () {
		return `
    <!doctype html>
    <html>
    <head>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2> 
      <form action="/login_process" method="post">
        ID: <input type="text" name="id">
        Passwored: <input type='password' name='password'>
        <input type="submit">
      </form>
    </body>
    </html>
    `;
	},
	Sign: function () {
		return `
    <!doctype html>
    <html>
    <head>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2> 
      <form action="/sign_process" method="post">
        ID: <input type="text" name="id">
        Passwored: <input type='password' name='password'>
        Name: <input type'text' name='name'>
        <input type="submit">
      </form>
    </body>
    </html>
    `;
	},
	Create: function () {
		return `
    <!doctype html>
    <html>
    <head>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2> 
      <form action="/create_process" method="post">
        Title: <input type='text' name='title'>
        Text: <textarea name='text'></textarea>
        <input type="submit">
      </form>
    </body>
    </html>
    `;
	},
	Update: function (boards) {
		return `
    <!doctype html>
    <html>
    <head>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2>
      <form action="/update_process" method="post">
        <input type='hidden' name='id' value='${boards[0].id}'>
        Title: <input type='text' name='title' value='${boards[0].title}'>
        Text: <textarea name='text'>${boards[0].text}</textarea>
        <input type="submit">
      </form>
    </body>
    </html>
    `;
	},
};
