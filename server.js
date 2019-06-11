const http = require('http');
const fsPromises = require('fs').promises;

const hostname = '127.0.0.1';
const port = 8787;

const users = {
  anna: {
    password: 'anna',
    notes: [
      'Sample Task To Do Sample Task To Do Sample Task To Do',
      'Sample Task To Do Sample Task To Do',
      'Sample Task To Do',
      'Sample Task To Do Sample Task To Do Sample Task To Do',
      'Sample Task To Do Sample Task To Do Sample Task To Do',
    ],
    done: [
      'Note That Is Already Done',
      'Note That Is Already Done',
      'Note That Is Already Done',
    ],
  },
};

// fsPromises
//   .writeFile(`${__dirname}/users/users.json`)
//   .then((data) => //work with data)
//   .catch((err) => //deal with error);

const parseCookies = (cookies) => {
  // cookies: 'coockie1name=cookie1value; cookie2name=cookie2value'
  const list = {};
  cookies.split(';').forEach((cookie) => {
    // cookie: 'cookie1name=cookie1value
    const parts = cookie.split('=');
    // parts: ['cookie1name', 'cookie1value']
    list[parts.shift().trim()] = parts[0];
    // list: {'cookie1name': 'cookie1value'}
  });
  return list;
};

const sendFile = (res, data, type) => {
  res.writeHead(200, {'Content-Type': type});
  res.end(data);
};

const mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/js',
  json: 'application/json',
};

const routing = {
  '/': (req, res) => {
    fsPromises
        .readFile(`${__dirname}/routing/html/index.html`)
        .then((data) => sendFile(res, data, 'text/html'))
        .catch((err) => console.log(err));
  },
  '/login': (req, res) => {
    let user = {};
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      user = JSON.parse(data);
      if (users[user.email] && users[user.email].password == user.password) {
        res.setHeader('Set-Cookie', [
          `email=${user.email}`,
          `password=${user.password}`,
        ]);
        res.statusCode = 200;
        res.end();
      } else {
        res.statusCode = 401;
        res.statusMessage = '401 unauthorised';
        res.end();
      }
    });
  },
  '/notes': (req, res) => {
    const cookiesRaw = req.headers['cookie'];
    const cookies = parseCookies(cookiesRaw);
    const email = cookies.email;
    const password = cookies.password;

    if (users[email] && users[email].password == password) {
      sendFile(res, JSON.stringify(users[email]), 'application/json');
    } else {
      res.statusCode = 401;
      res.statusMessage = '401 Unauthorised';
      res.end();
    }
  },
  '/register': (req, res) => {
    let user = '';
    let data = '';

    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      user = JSON.parse(data);
      if (users.hasOwnProperty(user.email)) {
        res.statusMessage = 'User is already registered';
        res.statusCode = 400;
        res.end();
      } else {
        users[user.email] = {
          password: user.password,
          notes: [],
          done: [],
        };
        res.setHeader('Set-Cookie', [
          `email=${user.email}`,
          `password=${user.password}`,
        ]);
        res.statusMessage = 'User is successfully registered';
        res.statusCode = 200;
        res.end();
      }
    });
  },
  '/updateNotes': (req, res) => {
    const cookiesRaw = req.headers['cookie'];
    const cookies = parseCookies(cookiesRaw);
    const email = cookies.email;

    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => {
      users[email] = JSON.parse(data);
      res.statusMessage = 'Data is saved';
      res.statusCode = 200;
      res.end();
    });
  },
  'default': (req, res) => {
    fsPromises
        .readFile(`${__dirname}${req.url}`)
        .then((data) => sendFile(res, data, mimes[req.url.split('.').pop()]))
        .catch((err) => console.log(err));
  },
};

const server = http.createServer((req, res) => {
  routing.hasOwnProperty(req.url)
    ? routing[req.url](req, res)
    : routing['default'](req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server is on ${hostname}:${port}`);
});
