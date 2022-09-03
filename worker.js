import http from 'http';
import { URL } from 'url';
import nunjucks from 'nunjucks';
import * as dotenv from 'dotenv';

dotenv.config();
const host = process.env.HOST;
const port = process.env.PORT;

const pid = process.pid;

nunjucks.configure('views', { autoescape: true });

const routeMap = {
  '': nunjucks.render('index.njk'),
  'form': nunjucks.render('form.njk'),
  'about': nunjucks.render('about.njk'),
}

export const worker = () => {
  return http
    .createServer((req, res) => {
      const requestURL = new URL(req.url, `http://${host}/`);
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
    }).listen(port, host, function () {
      console.log(`Worker started. PID: ${pid}`);
    });
};

worker();
