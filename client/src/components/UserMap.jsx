"use client"
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import io from 'socket.io-client';

// Fix Leaflet marker icons issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'leaflet/dist/images/marker-icon-2x.png',
  iconUrl: 'leaflet/dist/images/marker-icon.png',
  shadowUrl: 'leaflet/dist/images/marker-shadow.png',
});

const UserMap = () => {
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000'); // Change this to your backend URL
    setSocket(newSocket);

    // Listen for user location updates
    newSocket.on('locationUpdate', (data) => {
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.filter(user => user.id !== data.id);
        return [...updatedUsers, data];
      });
    });

    // Clean up on component unmount
    return () => newSocket.close();
  }, []);

  return (
    <MapContainer center={[51.505, -0.09]} zoom={10} className="w-[100vw] h-[100vh]">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {users.map(user => (
        <Marker key={user.id} position={[user.lat, user.lng]}>
          <Popup>{user.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default UserMap;
