import { Socket,io } from "socket.io-client";


//ROOMHANTERINGEN
const currentRoom = new URLSearchParams(document.location.search).get('room');
//io skapar en socket som kopplar upp sig mot servern
const socket:Socket = io('http://localhost:3000',{
  query: {
      roomName: currentRoom,
  },
});

const btnPlaceBid = document.getElementById("btnPlaceBid") as HTMLButtonElement;
btnPlaceBid.addEventListener("click", () => {
  console.log("place bid");
  //socket.emit skickar till server 
  //tar två parametrar, namn på meddelandet och data
  //vi hittar på namnet "placeBid"
  //det viktiga är att servern hanterar meddelandet med samma namn
  let bidderName = document.getElementById("bidderName") as HTMLInputElement;
  let bidAmount = document.getElementById("bidAmount") as HTMLInputElement;
  let o =  {name:bidderName.value, bid:bidAmount.value};

  socket.emit("placeBid", o);
})





