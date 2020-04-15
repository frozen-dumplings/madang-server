import Message from '../model/message';

export default function (io: SocketIO.Server): void {
  io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('message', (msg: Message) => {
      io.emit('message', msg);
    });
  });
}
