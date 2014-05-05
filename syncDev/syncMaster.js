  var socket ;
  $(document).ready(function(){
	socket = io.connect('http://localhost:2011');
  	socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
  socket.on("wtAdded", function(data){
    	console.log("message from server "+data);
  });
});
  