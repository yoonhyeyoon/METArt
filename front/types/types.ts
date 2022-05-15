// Art
export type ArtListType = {
  id: number;
  name: string;
  tokenURI: string;
  onSaleYn: boolean;
  creator: CreatorOwnerType;
  owner: CreatorOwnerType;
};

export type CreatorOwnerType = {
  address: string;
  name: string;
  profileUrl: string;
};

export type ArtType = {
  id: number;
  name: string;
  description: string;
  tokenURI: string;
  onSaleYn: boolean;
  creator: CreatorOwnerType;
  createdAt: string;
  updatedAt: string;
};
