export interface CreateBookDto {
  title: string;
  subtitle?: string;
  isbn13: number;
  price: string;
  image: string;
  url?: string;
}
