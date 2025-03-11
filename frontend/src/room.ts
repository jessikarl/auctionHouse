import { Socket,io } from "socket.io-client";


//ROOMHANTERINGEN
const currentRoom = new URLSearchParams(document.location.search).get('room');
//io skapar en socket som kopplar upp sig mot servern
const socket:Socket = io('http://localhost:3000',{
  query: {
      roomName: currentRoom,
  },
});




