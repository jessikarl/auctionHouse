
export class Auction{
    constructor(
        public id:string, 
        public name:string, 
        public minprice:number)
        {}
}

export class Bidder{
    constructor(
        public name: string,
        public price: number
    ){}
}