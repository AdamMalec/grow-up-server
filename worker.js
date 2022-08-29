import http from 'http';
const pid = process.pid;

export const worker = () => {
  return http
    .createServer((request, response) => {
      for (let i = 0; i < 1e7; i++) { }
      response.end('Hello NodeJS!');
    }).listen(3000, '127.0.0.1', function () {
      console.log(`Worker started. PID: ${pid}`);
    });
};
