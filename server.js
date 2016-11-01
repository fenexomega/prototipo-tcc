var http = require('http')
var serialport = require('serialport')
var serialPorts = [];
//Minha porta usb
var port = new serialport('/dev/ttyUSB0');
var fs = require('fs');

function getMapFromData(data)
{
	  var map = new Map();
      var args = data.toString('utf8').split('=');
      for(var i = 0; i < args.length; i += 2)
      {
        map.set(args[i],args[i + 1]);
      }
	  return map;

}

function handleRequest(request,response)
{
	// Ler o arquivo html
  var index = fs.readFileSync('index.html');
	// Se o método for POST
  if(request.method === 'POST')
  {
	  // Callback para pegar o payload da requisição
    request.on('data',function(data)
	{
		//Transforma a string em um mapa
		var map = getMapFromData(data);		
		if(map.get('value') != null)
		{
			//manda o valor via serial para o arduino
			port.write(map.get('value') + ' ');
		}
	});
  }
	//Escreve o cabeçalho e envia o arquivo .html para o navegador
  response.writeHead(200, {'Content-Type': 'text/html'});
  response.end(index);

}

//Auto explicativo
var server = http.createServer(handleRequest);

server.listen(8000);
