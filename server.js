var express = require('express'),
	app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


console.log("antes del listen");
app.listen(process.env.PORT || 2011, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
console.log("desp del listen");
app.use('/',express.static(__dirname +'/syncDev/'));
app.get('/', function(request, response) {
	console.log("entra aca");
  response.send(__dirname);
});



io.sockets.on('connection', function (socket) {
	console.log("llega a onconnection?");
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
 	socket.on("addWT", function(data){
 		console.log("New WorkingTime! "+JSON.stringify(data));
 		socket.emit("wtAdded", "WorkingTime added! ");
 	});	
});
