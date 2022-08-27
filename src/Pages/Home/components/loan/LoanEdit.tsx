import React, { FC, useEffect, useState } from "react";
import { Grid, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { FormContainer } from "../../../../common/components/FormContainer";
import { FormPaper } from "../../../../common/components/FormPaper";
import { EditProps } from "../../../../types/data/EditProps";
import { Book, Loan } from "../../../../types/model";
import { useDataProvider } from "../../../../utils/hooks";
import { grid } from "../../../../common/data/grid";

const INITIAL_LOAN: Omit<Loan, "id"> = {
  book: {},
  loanDate: new Date(),
};

export const LoanEdit: FC<EditProps> = ({ mode }) => {
  const { getOne, getList } = useDataProvider<Loan | Book>();
  const [loan, setLoan] = useState<Omit<Loan, "id">>(INITIAL_LOAN);
  const [books, setBooks] = useState<Book[]>();
  const { id } = useParams();

  const handleChange = (name: string, value: any) => {
    setLoan((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (id) {
          const { data } = await getOne("loans", +id);
          const bookList = await getList("books");
          setLoan(data as Loan);
          setBooks(bookList.data as Book[]);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <FormPaper resource="loans" context={mode} data={loan}>
      <FormContainer label="Reference">
        <Grid item {...grid.full}>
          <FormControl variant="filled" fullWidth size="small">
            <InputLabel>Select book</InputLabel>
            <Select
              label="book"
              name="book"
              value={books?.at(0)?.id || 1}
              onChange={(e) => handleChange(e.target.name, books?.find(book => book.id === e.target.value) || '')}
            >
              {books &&
                books.map((book) => {
                  console.log(JSON.stringify(book))
                  return (
                    <MenuItem value={book.id} key={book.id}>
                      {book.title}
                    </MenuItem>
                  )
                })}
            </Select>
          </FormControl>
        </Grid>
      </FormContainer>
    </FormPaper>
  );
};
