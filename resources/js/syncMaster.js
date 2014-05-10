var socket ;
$(document).ready(function(){
    socket = io.connect("http://localhost:2011/");
    socket.on('news', function (data){
	console.log(data);
	socket.emit('my other event', { my: 'data' });
    });
    socket.on("0", function(data){
    	console.log("data replicated successfully! "+data);
    });
    socket.on("1", function(data){
    	console.log("data replicated with error! "+data);
    });
    socket.on("syncFromServer",function(data){
	console.log("dato de entrada "+data.cod+" "+typeof(data.cod));
	saveWT(data);
    });

});

