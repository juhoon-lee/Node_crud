module.exports = {
	HTML: function (list) {
		return `
    <!doctype html>
    <html>
    <head>
      <style>
      *{
        text-decoration: none;
        list-style-type: none;
        text-align:center;
        color:black;
      }
      h3{
        display: inline;
      }
      ul{
        padding:0;
      }
      body{
        background-color: antiquewhite;
      }
      #main{
        diplay:block;
        width:50%;
        margin:auto;
        text-align:center;
      }
      </style>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <div id='main'>
      <h3><a href="/">메인으로</a></h3>
      <h3><a href="/login">| 로그인 |</a></h3>
      <h3><a href="/sign">회원가입</a></h3>
      </div>
      <hr>
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
    <style>
      *{
        text-decoration: none;
        list-style-type: none;
        text-align:center;
        color:black;
      }
      h3{
        display: inline;
      }
      ul{
        padding:0;
      }
      body{
        background-color: antiquewhite;
      }
      #main{
        diplay:block;
        width:50%;
        margin:auto;
        text-align:center;
      }
      </style>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h3>안녕하세요 ${name} 님 |</h3>
      <h3><a href="/">메인으로 |</a></h3>
      <h3><a href='/logout'>로그아웃 |</a></h3>
      <h3><a href='/create'>글쓰기<a></h3>
      <hr>
      ${list}
    </body>
    </html>
    `;
	},
	ShowBoard: (board, comments) => {
		return `
    <!doctype html>
    <html>
    <head>
    <style>
      *{
        text-decoration: none;
        list-style-type: none;
        text-align:center;
        color:black;
      }
      h3{
        display: inline;
      }
      ul{
        padding:0;
      }
      body{
        background-color: antiquewhite;
      }
      #main{
        diplay:block;
        width:50%;
        margin:auto;
        text-align:center;
      }
      </style>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body
      <h3><a href="/">메인으로</a></h3>
      <hr>
      <h3>제목: ${board[0].title}</h3>
      <p>내용: ${board[0].text}</p>
      <hr>
      <h4><댓글></h4>
      ${comments}
    </body>
    </html>
    `;
	},
	LoginShowBoard: (board, comments, author) => {
		let data = `
    <!doctype html>
    <html>
    <head>
    <style>
      *{
        text-decoration: none;
        list-style-type: none;
        text-align:center;
        color:black;
      }
      form{
        display : flex;
        width: 500px;
        margin:auto;
        align-items:center;
        text-align:center;
        justify-content: center;
        
      }
      h3{
        display: inline;
      }
      ul{
        padding:0;
      }
      body{
        background-color: antiquewhite;
      }
      #main{
        diplay:block;
        width:50%;
        margin:auto;
        text-align:center;
      }
      #row{
        display:block;
        align-items:center;
      }
      textarea{
        width:200px;
        height:150px;
      }
      input{
        width:90px;
        height:30px;
        background-color: transparent;
      }
      </style>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body
      <h2><a href="/">메인으로</a></h2>
      <hr>
      <h2>제목: ${board[0].title}</h2>
      <p>내용: ${board[0].text}</p>
      <hr>
      <h4><댓글></h4>
      ${comments}
      <form action="/comment_process" method="post">
        <input type='hidden' name='id' value='${board[0].id}'>
        <textarea name='comment'></textarea>
        <input type="submit" value='댓글 작성'>
        </form>
        `;
		if (board[0].author === author) {
			data += `<div id='row'><form action="/delete_process" method="post">
        <input type='hidden' name='id' value='${board[0].id}'>
        <input type='hidden' name='author' value='${board[0].author}'>
        <input type="submit" value='글 삭제하기'>
      </form>
      <form action="/update" method="post">
        <input type='hidden' name='id' value='${board[0].id}'>
        <input type="submit" value='글 수정하기'>
      </form></div>`;
		}
		data += `</body> </html>`;
		return data;
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
	Cmlist: function (comments, author) {
		var list = '<ul>';
		var i = 0;
		for (let i = 0; i < comments.length; i++) {
			list += `<li>${comments[i].comment} 작성자: ${comments[i].author}`;
			if (comments[i].author === author) {
				list += `<div id='row'><form action="/comment_update" method="post">
          <input type='hidden' name="author" value='${comments[i].author}'>
          <input type='hidden' name="id" value='${comments[i].id}'>
          <input type='hidden' name="comment" value='${comments[i].comment}'>
          <input type='hidden' name="board_id" value='${comments[i].board_id}'>
          <input type="submit" value='댓글 수정'>
        </form>
        <form action="/comment_delete" method="post">
          <input type='hidden' name="author" value='${comments[i].author}'>
          <input type='hidden' name="id" value='${comments[i].id}'>
          <input type='hidden' name="board_id" value='${comments[i].board_id}'>
          <input type="submit" value='댓글 삭제'>
        </form>`;
			}
			list += `</li></div>`;
		}
		list += '</ul>';
		return list;
	},
	Login: function () {
		return `
    <!doctype html>
    <html>
    <head>
      <style>
      *{
          text-decoration: none;
          text-align:center;
          color:black;
        }
        body{
          background-color: antiquewhite;
        }
        .sign {
          display:flex;
        }
        form {
          margin:auto;
          width:300px;
          border: solid black 3px;
          border-radius: 5%;
        }
        span{
          width:100px;
        }
        #lg{
          background-color: white;
          border:1px solid;
        }
      </style>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2> 
      <form action="/login_process" method="post">
        <div class='sign'><span>ID: </span><input type="text" name="id"></div>
        <div class='sign'><span>Passwored: </span><input type='password' name='password'></div>
        <input id='lg' type="submit" value='로그인'>
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
      <style>
        *{
          text-decoration: none;
          text-align:center;
          color:black;
        }
        body{
          background-color: antiquewhite;
        }
        .sign {
          display:flex;
        }
        form {
          margin:auto;
          width:300px;
          border: solid black 3px;
          border-radius: 5%;
        }
        span{
          width:100px;
        }
        #sb{
          background-color: white;
          border:1px solid;
        }
      </style>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2> 
      <form action="/sign_process" method="post">
        <div class='sign'><span>ID: </span><input type="text" name="id"></div>
        <div class='sign'><span>Password: </span><input type='password' name='password'></div>
        <div class='sign'><span>Name: </span><input type'text' name='name'></div>
        <input id='sb' type="submit" value='회원가입'>
      </form>
    </body>
    </html>
    `;
	},
	Create: function (author) {
		return `
    <!doctype html>
    <html>
    <head>
    <style>
    *{
          text-decoration: none;
          text-align:center;
          color:black;
        }
        body{
          background-color: antiquewhite;
        }
        form {
          margin:auto;
          width:500px;
          border: solid black 3px;
          border-radius: 5%;
          position:relative;
        }
        #title{
          width:350px;
        }
        textarea{
          width:350px;
          height:300px;
          transform:translateX(20px);
        }
        
        span{
          position:absolute;
          left:53px;
        }
    </style>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2> 
      <form action="/create_process" method="post">
        Author: ${author}
        <div>Title: <input id='title' type='text' name='title'></div>
        <div id='textarea'><span>Text:</span> <textarea name='text'></textarea></div>
        <input type="submit" value='글쓰기'>
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
    <style>
    *{
          text-decoration: none;
          text-align:center;
          color:black;
        }
        body{
          background-color: antiquewhite;
        }
        
        form {
          margin:auto;
          width:500px;
          border: solid black 3px;
          border-radius: 5%;
          position:relative;
        }
        #title{
          width:350px;
        }
        textarea{
          width:350px;
          height:300px;
          transform:translateX(20px);
        }
        
        span{
          position:absolute;
          left:53px;
        }
    </style>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2>
      <form action="/update_process" method="post">
        <input type='hidden' name='id' value='${boards[0].id}'>
        <div>Title: <input type='text' name='title' value='${boards[0].title}'></div>
        <div id='textarea'><span>Text:</span> <textarea name='text'>${boards[0].text}</textarea></div>
        <input type="submit" value='글 수정'>
      </form>
    </body>
    </html>
    `;
	},
	CommentUpdate: function (comment) {
		return `
    <!doctype html>
    <html>
    <head>
    <style>
    *{
          text-decoration: none;
          text-align:center;
          color:black;
        }
        body{
          background-color: antiquewhite;
        }
        form {
          margin:auto;
          width:500px;
          border: solid black 3px;
          border-radius: 5%;
          position:relative;
        }
        #title{
          width:350px;
        }
        textarea{
          width:350px;
          height:300px;
          transform:translateX(20px);
        }
        span{
          position:absolute;
          left:10px;
        }
    </style>
      <title>최종과제</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h2><a href="/">메인으로</a></h2>
      <form action="/comment_update_process" method="post">
        <input type='hidden' name="author" value='${comment.author}'>
        <input type='hidden' name="id" value='${comment.id}'>
        <input type='hidden' name="board_id" value='${comment.board_id}'>
        <div><span>Comment: </span><textarea name='comment'>${comment.comment}</textarea></div>
        <input type="submit" value='댓글 수정'>
      </form>
    </body>
    </html>
    `;
	},
};
