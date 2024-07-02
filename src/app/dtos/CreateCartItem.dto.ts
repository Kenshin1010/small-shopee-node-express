export interface CreateCartItemDto {
  product: {
    _id: string;
    isbn13: number;
    title: string;
    price: string;
    image: string;
    quantity: number;
  };
}
