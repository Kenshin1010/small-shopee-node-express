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
