import { redisClient, redisPublisher, redisSubscriber } from '../redis';
import Message from '../model/message';

interface JoinRequest {
  channel: string;
}

redisSubscriber.subscribe('channel');

export default function (io: SocketIO.Server): void {
  io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('channel/register', (request: JoinRequest) => {
      redisClient.set(`channel/${socket.id}`, request.channel, () => {
        socket.join(request.channel);
      });
    });

    socket.on('channel/message', (msg: Message) => {
      redisClient.get(`channel/${socket.id}`, (err, channel) => {
        const message = {
          ...msg,
          channel,
        };
        redisPublisher.publish('channel', JSON.stringify(message));
      });
    });
  });

  redisSubscriber.on('message', (channel, message: string) => {
    const msg: Message = JSON.parse(message);
    io.to(msg.channel).emit('channel/message', msg);
  });
}
