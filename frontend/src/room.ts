import { Socket,io } from "socket.io-client";

const currentRoom = new URLSearchParams(document.location.search).get('room');
const socket:Socket = io('http://localhost:3000',{
  query: {
      roomName: currentRoom,
  },
});

socket.on("Error: To low bid", (errortext) => {
  alert(errortext)
})


socket.on("newBid", (d) => {
  console.log("newBid", d.name, d.bid);
  let highestBidder = document.getElementById("highestBidder") as HTMLSpanElement;
  let currentBid = document.getElementById("currentBid") as HTMLSpanElement;
  let minprice = document.getElementById("minprice") as HTMLSpanElement;
  highestBidder.innerText = d.name;
  currentBid.innerText = d.bid;
  minprice.innerText = d.minprice;
})



const btnPlaceBid = document.getElementById("btnPlaceBid") as HTMLButtonElement;
btnPlaceBid.addEventListener("click", () => {
  console.log("place bid");
  let bidderName = document.getElementById("bidderName") as HTMLInputElement;
  let bidAmount = document.getElementById("bidAmount") as HTMLInputElement;
  let o =  {name:bidderName.value, bid:bidAmount.value};
  socket.emit("placeBid", o);
})





