const hapi = require('hapi');
const bcrypt = require('bcrypt');



var users = {
  default: {
    id: 1,
    username: 'default',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // 'secret'
    name: 'Default Name',
  }
}

var server = new hapi.Server();

server.connection({ port: process.env.PORT || 3000 })

const validate = (request, username, password, callback) => {
  const user = users[username];

  if (!user) {
    return callback(null, false);
  }

  bcrypt.compare(password, user.password, (err, isValid) => {
    callback(err, isValid, {id: user.id, name: user.name});
  });
}

server.register(require('hapi-auth-basic'), (err) => {
  if (err) throw err;


  server.auth.strategy('simple', 'basic', {validateFunc: validate});

  server.route({
    method: 'GET',
    path: '/secure',
    config: {
      auth: 'simple',
      handler: (req, rep) => {
        rep('You have access to this page!');
      }
    }
  })

  server.start((err) => {
    if (err) throw err;

    console.log(`Server running at: ${server.info.uri}`);
  })
})
