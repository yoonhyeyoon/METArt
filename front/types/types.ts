// Art List
export type ArtListType = {
  content: ContentType[];
  pageable: PageableType;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  first: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
};

export type ContentType = {
  id: number;
  name: string;
  tokenURI: string;
  onSaleYn: boolean;
  creator: CreatorOwnerType;
  owner: CreatorOwnerType;
  sale: SaleType | null;
};

export type CreatorOwnerType = {
  address: string;
  name: string;
  profileUrl: string;
};

export type SaleType = {
  id: number;
  price: number;
  createdAt: string;
  completedAt: string | null;
  seller: CreatorOwnerType;
  buyer: string | null;
};

export type PageableType = {
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  pageSize: number;
  pageNumber: number;
  unpaged: boolean;
  paged: boolean;
};

// Art
export type ArtType = {
  id: number;
  name: string;
  description: string;
  tokenURI: string;
  onSaleYn: boolean;
  creator: CreatorOwnerType;
  owner: CreatorOwnerType;
  sale: SaleType;
  createdAt: string;
  updatedAt: string;
};
