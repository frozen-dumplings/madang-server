import http from 'http';
import SocketIO from 'socket.io';

export default function (server: http.Server): SocketIO.Server {
  const io = SocketIO(server);
  io.on('connect', (clientSocket: SocketIO.Socket) => {
    console.log('Client connected with socket.io with id:', clientSocket.id);
  });

  return io;
}
