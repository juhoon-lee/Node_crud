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
      <a href="/create">글쓰기</a>
    </body>
    </html>
    `;
	},
	list: function (filelist) {
		var list = '<ul>';
		var i = 0;
		// console.log(filelist);

		while (i < filelist.length) {
			list = list + `<li><a href="/?id=${filelist[i].id}">${filelist[i].title}</a></li>`;
			i = i + 1;
		}
		list = list + '</ul>';
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
      <form action="/login_proccess" method="post">
        ID: <input type="text" name="id">
        Passwored: <input type='text' name='password'>
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
      <form action="/sign_proccess" method="post">
        ID: <input type="text" name="id">
        Passwored: <input type='text' name='password'>
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
      <form action="/create_proccess" method="post">
        Title: <input type='text' name='title'>
        Text: <textarea name='text'></textarea>
        <input type="submit">
      </form>
    </body>
    </html>
    `;
	},
};
