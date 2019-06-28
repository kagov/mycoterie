var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

app.get('/mypage', function(req, res){
  res.sendFile(__dirname + '/mypage.html');
});

app.get('/main.css', function(req, res){
    res.sendFile(__dirname + '/main.css');
  });

  app.get('/chat-client.js', function(req, res){
    res.sendFile(__dirname + '/chat-client.js');
  });  

io.on('connection', function(socket){

  socket.on('chat_message', function(msg){
    console.log('message: ' + msg);
    io.emit("message_from_kaushik",msg)
  });

  socket.on('chat_brin', function(msg){
    console.log('message from brin: ' + msg);
    io.emit("message_from_brin",msg)
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:3000');
});