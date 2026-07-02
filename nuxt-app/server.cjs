// Phusion Passenger entry point for Nuxt 3 SSR
// Using async import() to load ESM from CommonJS

const http = require('http');
const path = require('path');
const fs = require('fs');

async function startNuxtServer() {
    try {
        console.log('=== Starting Nuxt 3 SSR ===');
        console.log('Node version:', process.version);
        console.log('PORT:', process.env.PORT);
        console.log('CWD:', process.cwd());

        const entryPath = path.join(__dirname, '.output', 'server', 'index.mjs');

        if (!fs.existsSync(entryPath)) {
            throw new Error('Build not found at ' + entryPath);
        }

        // Dynamic import for ESM module
        await import('./.output/server/index.mjs');

    } catch (error) {
        console.error('STARTUP ERROR:', error);

        // Fallback: return error page so we can see what's happening
        const server = http.createServer((req, res) => {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>Nuxt Startup Error</h1><pre>' + error.stack + '</pre>');
        });
        server.listen(process.env.PORT || 3000);
    }
}

startNuxtServer();
