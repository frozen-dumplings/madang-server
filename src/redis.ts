import redis from 'redis';

const options = {
  url: process.env.REDIS_URL,
};

const redisPublisher = redis.createClient(options);
const redisSubscriber = redis.createClient(options);

export { redisPublisher, redisSubscriber };
