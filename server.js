const http = require('http');
const fs = require('fs');

const users = require(__dirname + '/routing/users/users.json');

const hostname = '192.168.0.102';
const port = 8787;

const readData = (path) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, (err, data) =>
            err ? reject(err) : resolve(data)
    ));
};

const parseCookies = (cookies) => {
  const list = {};
  cookies.split(';').forEach((cookie) => {
    const parts = cookie.split('=');
    list[parts.shift().trim()] = parts[0];
  });
  return list;
};

const routes = {
  '.html': function(req, res) {
    readData(__dirname + '/routing/html' + req.url).then((data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    }).catch(() => {
      readData(__dirname + '/routing/html/nopage.html').then((data) => {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(data);
      }).catch((err) => console.log(err));
    });
  },
  '.css': function(req, res) {
    readData(__dirname + '/routing/css' + req.url).then((data) => {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    }).catch((err) => console.log(err));
  },
  '.js': function(req, res) {
    readData(__dirname + '/routing/js' + req.url).then((data) => {
      res.writeHead(200, {'Content-Type': 'text/js'});
      res.end(data);
    }).catch((err) => console.log(err));
  },
  './user': function(req, res) {
    let user = '';
    let data = '';
    req.on('data', (chunk) => data += chunk);
    req.on('end', () => {
      user = JSON.parse(data);
      if (users[user.email] && users[user.email].password == user.password) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('200 OK');
      } else {
        res.writeHead(401, {'Content-Type': 'text/plain'});
        res.end('401 Unauthorised');
      }
    });
  },
  './notes': function(req, res) {
    const cookiesRaw = req.headers['cookie'];
    const cookies = parseCookies(cookiesRaw);
    const email = cookies.email;
    const password = cookies.password;
    if (users[email] && users[email].password == password) {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(users[email]));
    } else {
      res.writeHead(401, {'Content-Type': 'text/plain'});
      res.end('401 Unauthorised');
    }
  },
  './': function(req, res) {
    readData(__dirname + '/routing/html/index.html').then((data) => {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(data);
    });
  },
  'default': function(req, res) {
    readData(__dirname + '/routing/html/nopage.html').then((data) => {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end(data);
    }).catch((err) => console.log(err));
  },
};

const routing = (req, res) => {
  let route = `.${req.url.split('.').pop()}`;
  route = (route in routes) ? route : 'default';
  routes[route](req, res);
};

const server = http.createServer((req, res) => {
  routing(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server is on ${hostname}:${port}`);
});
