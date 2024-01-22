import express, { Request, Response } from 'express';
import usersRoutes from './routes/users';
import convsRoutes from './routes/conversations';
import messagesRoutes from './routes/messages';
import dbCreation from './utils/database';
import dotenv from 'dotenv';
import { createServer } from "http";
import { Server as SocketIOServer } from 'socket.io';

var cors = require('cors')
dotenv.config();

const app = express();
const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
const port =  process.env.SERVER_PORT || 1234;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', usersRoutes);
app.use('/conversations', convsRoutes);
app.use('/messages', messagesRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! This is IncognitoPal server. You should not be here.');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');  
  });
});

server.listen(port, () => {
  dbCreation;
  console.log(`Server running at http://localhost:${port}`);
});