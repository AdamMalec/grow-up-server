import http from 'http';
import { URL } from 'url';
import nunjucks from 'nunjucks';

const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const pid = process.pid;

nunjucks.configure('views', { autoescape: true });

const routeMap = {
  '': nunjucks.render('index.njk'),
  'works': nunjucks.render('works.njk'),
  'about': nunjucks.render('about.njk'),
}

export const worker = () => {
  return http
    .createServer((req, res) => {
      const requestURL = new URL(req.url, `http://${HOSTNAME}/`);
      // standardize the requested url by removing any '/' at the start or end
      // '/folder/to/file/' becomes 'folder/to/file'
      let path = requestURL.pathname.replace(/^\/+|\/+$/g, '');
      if (routeMap[path]) {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(routeMap[path]);
      } else {
        res.statusCode = 404;
        res.end('Sorry, page not found!');
      }
    }).listen(PORT, HOSTNAME, function () {
      console.log(`Worker started. PID: ${pid}`);
    });
};

worker();
