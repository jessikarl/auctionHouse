import { Auction } from "./auction";

export let auctions:Array<Auction> = []

export function Init(){
    auctions.push(new Auction("M-12", "Armchair",1500,0,""))
    auctions.push(new Auction("A-67", "Painting: Landscape",1200,0,""))
    auctions.push(new Auction("S-991","Coffee Mug",800,0,""))
};