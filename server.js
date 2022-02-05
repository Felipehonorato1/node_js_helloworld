const http = require("http");

http.createServer((request, response) => {

    if (request.url == '/produto') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
            message: "ROTA DE PRODUTO"
        }));
    }

    if (request.url == '/usuario') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
            message: "ROTA DE USUARIO"
        }));
    }

    else {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
            message: "QQR ROTA"
        }));


    }


}).listen(8080)