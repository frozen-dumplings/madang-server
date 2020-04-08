import { redisPublisher, redisSubscriber } from '../redis';
import Message from '../model/message';

redisSubscriber.subscribe('message');

export default function (io: SocketIO.Server): void {
  io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('message', (msg: Message) => {
      redisPublisher.publish('message', JSON.stringify(msg));
    });
  });

  redisSubscriber.on('message', (channel, message) => {
    io.emit('message', JSON.parse(message));
  });
}
