export default function (io: SocketIO.Server): void {
  io.on('connect', (socket: SocketIO.Socket) => {
    socket.on('echoRequest', (msg: string) => {
      socket.emit('echoResponse', msg);
    });
  });
}
