const hapi = require('hapi');
const vision = require('vision');
const path = require('path');
const inert = require('inert');
const handlebars = require('handlebars');

const routes = require('./routes/index.js');

const server = new hapi.Server();

server.connection({
  host: 'localhost',
  port: process.env.PORT || 3000
})

server.register([inert, vision], (err) => {
  if (err) throw err;

  server.views({
    engines: {
      hbs: handlebars
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layout'
  })

  server.route(routes);

  server.start((err) => {
    if (err) throw err;
    console.log(`Server running on port ${server.info.port}`);
  })
});
