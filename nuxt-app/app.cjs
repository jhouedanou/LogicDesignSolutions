// Entry point for Phusion Passenger - CommonJS version for maximum compatibility
const http = require('http');

// Minimal Hello World Server to test Passenger
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World from Node.js ' + process.version + '\nRunning on PORT: ' + process.env.PORT);
});

const port = process.env.PORT || 3000;

// Log startup
console.log('Attempting to listen on port: ' + port);

server.listen(port, () => {
    console.log('Server running at ' + port);
});
