// Entry point for Phusion Passenger - Loads Nuxt server output
// Passenger requires a CJS entry point, we dynamically import the ESM Nuxt server

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.HOST = process.env.HOST || '0.0.0.0';
process.env.PORT = process.env.PORT || '3000';

console.log('[Passenger] Starting Nuxt server...');
console.log('[Passenger] Node.js version:', process.version);
console.log('[Passenger] PORT:', process.env.PORT);
console.log('[Passenger] NODE_ENV:', process.env.NODE_ENV);

import('./.output/server/index.mjs')
  .then(() => {
    console.log('[Passenger] Nuxt server started successfully');
  })
  .catch((err) => {
    console.error('[Passenger] Failed to start Nuxt server:', err);
    process.exit(1);
  });
