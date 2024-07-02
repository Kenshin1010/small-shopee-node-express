export interface IBook {
  _id: string;
  title: string;
  subtitle?: string;
  isbn13: number;
  price: string;
  image: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPurchasedItem {
  product: IBook & {
    _id: string;
    isbn13: number;
    title: string;
    price: string;
    image: string;
    quantity: number;
  };
}

export interface IPurchasedHistoryItem {
  _id: string;
  orderName: string;
  orderData: {
    cartProductItems: IPurchasedItem[];
    orderTime: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItemSave {
  _id: string;
  product: {
    _id: string;
    quantity: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartItem {
  product: IBook & {
    _id: string;
    isbn13: number;
    title: string;
    price: string;
    image: string;
    quantity: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
