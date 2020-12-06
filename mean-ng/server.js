const http = require('http');
const expApp = require('././backend/app');

const port = process.env.PORT || 3000
expApp.set('port', port);
const server = http.createServer(expApp);

server.listen(process.env.PORT || 3000);
