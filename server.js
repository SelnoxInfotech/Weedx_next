// server.js
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
// const ip = '192.168.1.20';
app.prepare().
then(() => {
  const server = express();

  // Custom route example
  server.get('/custom-route', (req, res) => {
    return app.render(req, res, '/custom-route', req.query);
  });
  server.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
   Disallow: /`);
  });

  // Handle all other routes with Next.js
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> woking on http://localhost:3000');
  });
});
