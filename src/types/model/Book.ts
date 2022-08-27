export type STATUS = 'AVAILABLE' | 'TAKEN';

export type Book = {
  id: number;
  title: string;
  author: string;
  categoryName: string;
  pageSize: number;
  status: STATUS;
  loanNumber: number;
}

export type BookPut = Omit<Book, 'loanNumber' | 'status'>;
