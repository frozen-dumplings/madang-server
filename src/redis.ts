import redis from 'redis';

const options = {
  url: process.env.REDIS_URL,
};

const redisClient = redis.createClient(options);
const redisPublisher = redis.createClient(options);
const redisSubscriber = redis.createClient(options);

export {
  redisClient,
  redisPublisher,
  redisSubscriber,
};
