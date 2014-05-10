var express = require('express'),
	app = express()
  , server = require('http').createServer(app)
, io = require('socket.io').listen(server), mysql = require("mysql");

function WorkingTime(){
    this.cod=1;
    this.employee = 0;
    this.captcheckin = new Blob();
    this.checkin = new Date();
    this.captcheckout = null;
    this.checkout = null;
};

var testdb = mysql.createConnection({
    host:"localhost",
    user: "1",
    password: "1",
    database: "test"
});


function saveCheckin(wt,callback){

    testdb.query("insert into workingtime values (?,?,?,?,?,?)", [wt.cod,wt.employee,wt.captcheckin,wt.checkin,wt.captcheckout,wt.checkout],callback);
}


function saveCheckout(wt,callback){
    console.log(wt);
    testdb.query("update workingtime set captcheckout = ?, checkout = ? where cod = ?;",
		 [wt.captcheckout,wt.checkout,wt.cod],callback);
}

console.log("antes del listen");
server.listen(2011);
console.log("desp del listen");
app.use('/',express.static(__dirname));
app.get('/', function(request, response) {
	console.log("entra aca");
  response.send(__dirname);
});


io.sockets.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
    });
    socket.on("checkin", function(data){
	console.log("llega a checkin? cod "+data.cod+" employee "+data.employee);
	saveCheckin(data,function(err,result){
	    if(!err){
		socket.broadcast.emit("syncFromServer",data);
		socket.emit("0",result);
	    }else{
		socket.emit("1",err);
	    }
	});
	
 	
    });
    socket.on("checkout", function(data){
	console.log("llega a checkout?");
	saveCheckout(data,function(err,result){
	    if(!err){
		socket.broadcast.emit("syncFromServer",data);
		socket.emit("0","data sent successfully!");
	    }else{
		socket.emit("1","error when sending data");
	    }
	});
	
    });
	
});
