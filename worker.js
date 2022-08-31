import http from 'http';
import fs from 'fs';

const HOST = '127.0.0.1';
const PORT = 3000;
const pid = process.pid;

const routeMap = {
  '': 'pages/index.html',
  'works': 'pages/works.html',
  'about': 'pages/about.html',
}

export const worker = () => {
  return http
    .createServer((request, response) => {
      const url = request.url;
      render(response, routeMap[url.slice(1)]);

    }).listen(PORT, HOST, function () {
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
