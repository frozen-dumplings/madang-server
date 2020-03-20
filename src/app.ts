import express from 'express';
import logger from 'morgan';
import http from 'http';

import './env';

import indexRouter from './routes/index';

import SocketServer from './socket';
import echoHandler from './socket-handler/echo-handler';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(indexRouter);

const port = Number(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

const io = SocketServer(server);

echoHandler(io);

server.listen(port);
