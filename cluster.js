import cluster from 'cluster';
import { worker } from './worker.js';
import os from 'os';

const numCPUs = os.cpus().length;
const pid = process.pid;

if (cluster.isPrimary) {
  console.log(`CPUs: ${numCPUs}`);
  console.log(`Primary ${pid} is running`);
  // Fork workers
  for (let i = 0; i < numCPUs - 1; i++) {
    const worker = cluster.fork();
  }

  cluster.on('exit', (code, signal) => {
    console.log(`Worker died! PID ${pid}`);
    cluster.fork();
  });

} else {
  worker();
}
