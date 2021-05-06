import Queue from 'bull';
import { BullAdapter } from 'bull-board/bullAdapter';
import {createBullBoard} from 'bull-board/'

import redis from './config/redis'
import * as jobs from './jobs';

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, { redis }),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

const add = (name: string, data: any): any => {
  const queue = queues.find(qu => qu.name === name);

  return queue?.bull.add(data, queue.options);
};

const process = (): void => {
  return queues.forEach(queue => {
    queue.bull.process(queue.handle);
  });
};

const {router} = createBullBoard(queues.map(queue => new BullAdapter(queue.bull)))

export {
  queues,
  add,
  process,
  router,
};

process();
