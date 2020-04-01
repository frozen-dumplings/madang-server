import redisClient from '../redis';

interface Message {
  timestamp: number;
  message: string;
}

export default function (io: SocketIO.Server): void {
  io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('message', (msg: Message) => {
      io.emit('message', msg);
      redisClient.publish('message', JSON.stringify(msg));
    });

    redisClient.on('message', (channel, message) => {
      io.emit('message', JSON.parse(message));
    });
  });
}
