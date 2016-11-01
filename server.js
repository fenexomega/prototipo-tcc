var http = require('http')
var serialport = require('serialport')
var serialPorts = [];
var port = new serialport('/dev/ttyUSB0');
var fs = require('fs');

port.on('open',function(){

});

serialport.list(function (err, ports){
ports.forEach(function(port){
  serialPorts.push(port.comName);
});
});

function handleRequest(request,response)
{
  var index = fs.readFileSync('index.html');
  var map = new Map();
  console.log(request.method);
  if(request.method === 'POST')
  {
    request.on('data',function(data){
      console.log(data);
      var args = data.toString('utf8').split('=');
      for(var i = 0; i < args.length; i += 2)
      {
        map.set(args[i],args[i + 1]);
      }
      if(map.get('value') != null)
      {
        port.write(map.get('value') + ' ');
      }
    });

  }
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(index);


}

var server = http.createServer(handleRequest);

server.listen(8000);
