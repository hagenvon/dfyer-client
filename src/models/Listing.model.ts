export interface ListingResponse {
  pdaAddress: string;
  auctionHouse: "";
  tokenAddress: string;
  tokenMint: string;
  seller: string;
  tokenSize: number;
  price: number;
  rarity: {};
  extra: {
    img: string;
  };
}

export interface Listing {
  tokenMint: string;
  seller: string;
  price: number;
}
