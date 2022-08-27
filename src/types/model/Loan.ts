import { Book } from "./Book";

export type Loan = {
  id: number;
  book: Partial<Book>;
  loanDate: Date;
}
