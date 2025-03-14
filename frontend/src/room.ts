import { Socket,io } from "socket.io-client";

const currentRoom = new URLSearchParams(document.location.search).get('room');
const socket:Socket = io('http://localhost:3000',{
  query: {
      roomName: currentRoom,
  },
});

fetch(`http://localhost:3000/api/auctions/${currentRoom}`)
  .then(response => response.json())
  .then(auction => {
    if (!auction) {
      alert("Auction not found!");
      return;
    }

    console.log("Auction data:", auction);
    
    let auctionName = document.getElementById("auctionName") as HTMLHeadingElement;
    let minprice = document.getElementById("minprice") as HTMLSpanElement;
    let highestBidder = document.getElementById("highestBidder") as HTMLSpanElement;
    let currentBid = document.getElementById("currentBid") as HTMLSpanElement;

    auctionName.innerText = auction.name;
    minprice.innerText = auction.minprice;
    highestBidder.innerText = auction.highestBidder || "No bids yet";
    currentBid.innerText = auction.highestBid || auction.minprice;
  })
  .catch(error => console.error("Error fetching auction:", error));

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





