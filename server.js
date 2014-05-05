var express = require('express'),
	app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);



server.listen(2011);

app.use('/',express.static(__dirname +'/syncDev/'));
app.get('/', function(request, response) {
  response.send(__dirname);
});



io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
 	socket.on("addWT", function(data){
 		console.log("New WorkingTime! "+JSON.stringify(data));
 		socket.emit("wtAdded", "WorkingTime added! ");
 	});	
});