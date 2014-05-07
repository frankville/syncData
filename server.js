var express = require('express'),
	app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


console.log("antes del listen");
server.listen(process.env.PORT || 80);
console.log("desp del listen");
app.use('/',express.static(__dirname));
app.get('/', function(request, response) {
	console.log("entra aca");
  response.send(__dirname);
});



io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
 	socket.on("addWT", function(data){
      console.log("llega a addWT?");

 		console.log("New WorkingTime! "+JSON.stringify(data));
 		socket.emit("wtAdded", "WorkingTime added! ");
 	});	
});
