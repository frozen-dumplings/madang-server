import redis from 'redis';

const options = {
  url: process.env.REDIS_URL,
};

const redisClient = redis.createClient(options);

export default redisClient;
