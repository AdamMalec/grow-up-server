import http from 'http';
const pid = process.pid;

http
  .createServer((request, response) => {
    response.end("Hello NodeJS!");
  }).listen(3000, "127.0.0.1", function () {
    console.log(`Server started. PID: ${pid}`);
  });
