import { io } from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';

const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to Socket.IO server:', socket.id);
  const token = localStorage.getItem('token');
  if (token) {
    // Decode the token to get the user ID
    const decodedToken = jwtDecode(token);
    const clientId = decodedToken.userId; // Ensure your token has a userId field

    // Emit the registerClient event with the clientId
    socket.emit('registerClient', clientId);
  } else {
    console.error('No token found');
  }
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});
export default socket;
