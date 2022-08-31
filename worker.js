import http from 'http';
import { URL } from 'url';
import fs from 'fs';

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
// HOST = `${HOSTNAME}:${PORT}`                    *-memento-*
const pid = process.pid;

const routeMap = {
  '': 'pages/index.html',
  'works': 'pages/works.html',
  'about': 'pages/about.html',
}

export const worker = () => {
  return http
    .createServer((request, response) => {
      const requestURL = new URL(request.url, `http://${HOSTNAME}/`);
      // standardize the requested url by removing any '/' at the start or end
      // '/folder/to/file/' becomes 'folder/to/file'
      let path = requestURL.pathname.replace(/^\/+|\/+$/g, '');
      render(response, routeMap[path]);
    }).listen(PORT, HOSTNAME, function () {
      console.log(`Worker started. PID: ${pid}`);
    });
};

function render(res, htmlFile) {
  fs.stat(`./${htmlFile}`, (err, stats) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if (stats) {
      fs.createReadStream(htmlFile).pipe(res);
    } else {
      res.statusCode = 404;
      res.end('Sorry, page not found!');
    }
  });
}

worker();
