import http from 'http';
import SocketIO from 'socket.io';
import redisAdapter from 'socket.io-redis';

const redisUrl = process.env.REDIS_URL || 'localhost:6379';

export default function (server: http.Server): SocketIO.Server {
  const io = SocketIO(server);
  io.adapter(redisAdapter(redisUrl));
  return io;
}
