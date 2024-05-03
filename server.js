const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const SerialPort = require('serialport');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Define the port for the backend server
const PORT = process.env.PORT || 3001;

// Configure SerialPort (adjust port name and settings as needed)
const port = new SerialPort('/dev/tty.wchusbserialfa1410', {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('Client connected');

  // Handle data from Arduino
  socket.on('arduino-data', (data) => {
    io.emit('arduino-data', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Enable CORS
app.use(cors());

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
