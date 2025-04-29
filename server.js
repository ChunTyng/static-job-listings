const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data/data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(3500, () => {
  console.log('JSON Server is running at http://localhost:3500');
});
