import redis from 'redis';

const options = {
  url: process.env.REDIS_URL,
};

const redisClient = redis.createClient(options);
const redisMessagePublisher = redis.createClient(options);
const redisMessageSubscriber = redis.createClient(options);
const redisChannelPublisher = redis.createClient(options);
const redisChannelSubscriber = redis.createClient(options);

export {
  redisClient,
  redisMessagePublisher,
  redisMessageSubscriber,
  redisChannelPublisher,
  redisChannelSubscriber,
};
