import Redis from 'ioredis'

const config = {
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASS,
};

const client = new Redis(config)
const subscriber = new Redis(config)
const bclient = new Redis(config)

function createClient(type?: string) {
  switch (type) {
    case 'client':
      client.setMaxListeners(client.getMaxListeners() + 1);
      return client;
    case 'subscriber':
      subscriber.setMaxListeners(subscriber.getMaxListeners() + 1);
      return subscriber;
    case 'bclient':
      bclient.setMaxListeners(bclient.getMaxListeners() + 1);
      return bclient;
    default:
      return new Redis(config)
  }
}

export default {
  createClient,
}
