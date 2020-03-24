import http from 'http';
import SocketIO from 'socket.io';

export default function (server: http.Server): SocketIO.Server {
  const io = SocketIO(server);
  return io;
}
