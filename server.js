const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Handle socket connections
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle data from Arduino
  // Example: when data is received from Arduino, emit it to all connected clients
  // Replace 'arduino-data' with your event name
  // Replace 'data' with the actual data received from Arduino
  // You can also emit JSON objects if needed
  socket.on('arduino-data', (data) => {
    io.emit('arduino-data', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');

// Enable CORS
app.use(cors());

// Define your routes and other middleware...

app.listen(3001, () => {
  console.log('Backend server running on port 3001');
});
