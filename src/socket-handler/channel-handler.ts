import redisClient from '../redis';
import Message from '../model/message';

interface JoinRequest {
  channel: string;
}

export default function (io: SocketIO.Server): void {
  io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('channel/register', (request: JoinRequest) => {
      redisClient.set(`channel/${socket.id}`, request.channel, () => {
        socket.join(request.channel);
      });
    });

    socket.on('channel/message', (msg: Message) => {
      redisClient.get(`channel/${socket.id}`, (err, channel) => {
        io.to(channel).emit('channel/message', msg);
      });
    });
  });
}
