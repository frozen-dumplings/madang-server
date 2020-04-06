import { redisPublisher, redisSubscriber } from '../redis';
import Message from '../model/message';

interface JoinRequest {
  channel: string;
}

redisSubscriber.subscribe('channel');

export default function (io: SocketIO.Server): void {
  io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('channel/register', (request: JoinRequest) => {
      socket.join(request.channel);
    });

    socket.on('channel/message', (msg: Message) => {
      redisPublisher.publish('channel/message', JSON.stringify(msg));
    });
  });

  redisSubscriber.on('channel/message', (channel, message) => {
    io.to('channel').emit('message', JSON.parse(message));
  });
}
