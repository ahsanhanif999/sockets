import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: '*', // Replace with the appropriate origin or whitelist of origins
    methods: ['GET', 'POST'], // Adjust the allowed methods as needed
    allowedHeaders: ['Content-Type'], // Add any required headers
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (message) => {
    console.log('Received message:', message);
    // You can broadcast the message to all connected clients here
    io.emit('chat message', message);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
