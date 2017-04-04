const handler = (req, rep) => {
  let data = {
    title: 'Vision Handlebars Example',
    message: 'Hello world'
  }
  rep.view('index', data);
}

const options = {
  method: 'GET',
  path: '/',
  handler: handler
};

module.exports = options;
