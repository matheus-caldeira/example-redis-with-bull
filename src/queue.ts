import Queue from 'bull';
import { BullAdapter } from 'bull-board/bullAdapter';
import {createBullBoard} from 'bull-board'

import redis from './config/redis'
import jobs from './jobs';

const queues: any[] = [];
// Object.values(jobs).map(job => ({
//   bull: new Queue(job.key, {...redis, limiter: {
//     duration: 1,
//     max: 1,
//   }}),
//   prefix: '',
//   name: job.key,
//   handle: job.handle,
//   options: job.options,
// }));

const subQueues: any[] = [];

const all = createBullBoard([])
const orders = createBullBoard([]);

interface IAdd {
  name: string;
  prefix?: string;
  data: any;
}

const create = ({name, data, prefix}: IAdd) => {
  const queue = {
    bull: new Queue(`${prefix}:${name}`, {...redis, limiter: {
      max: 1,
      duration: 1,
    }}),
    prefix: prefix,
    name: `${prefix}:${name}`,
    handle: jobs[name].handle,
    options: jobs[name].options,
  }
  queue.bull.process(queue.handle);
  queue.bull.add(data, queue.options)

  return queue;
};

const add = ({name, data, prefix = ''}: IAdd): any => {
  if (!!prefix) {
    let queue = subQueues.find(qu => `${prefix}:${name}` === qu.name);

    if(!queue) {
      queue = create({name, data, prefix});
      subQueues.push(queue);
      orders.setQueues(subQueues.map(qu => new BullAdapter(qu.bull)));
    } else
      queue.bull.add(data, queue.options)
  } else {
    let queue = queues.find(qu => qu.name === name);
    if (!queue){
      queue = create({name, data, prefix});
      queues.push(queue);
      orders.setQueues(queues.map(qu => new BullAdapter(qu.bull)));
    }
    else
      queue?.bull.add(data, queue.options);
  }
};

export {
  queues,
  add,
  all,
  orders,
};
