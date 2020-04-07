import { redisMessagePublisher, redisMessageSubscriber } from '../redis';
import Message from '../model/message';

redisMessageSubscriber.subscribe('message');

export default function (io: SocketIO.Server): void {
  io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('message', (msg: Message) => {
      redisMessagePublisher.publish('message', JSON.stringify(msg));
    });
  });

  redisMessageSubscriber.on('message', (channel, message) => {
    io.emit('message', JSON.parse(message));
  });
}
