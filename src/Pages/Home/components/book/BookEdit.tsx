import React, { FC, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { FormContainer } from "../../../../common/components/FormContainer";
import { FormPaper } from "../../../../common/components/FormPaper";
import { EditProps } from "../../../../types/data/EditProps";
import { Book, Category } from "../../../../types/model";
import { useDataProvider } from "../../../../utils/hooks";

const INITIAL_BOOK: Omit<Book, "id"> = {
  title: "",
  author: "",
  categoryName: "",
  loanNumber: 0,
  pageSize: 0,
  status: "AVAILABLE",
};

export const BookEdit: FC<EditProps> = ({ mode }) => {
  const grid = {
    full: { xs: 12 },
    two: { xs: 12, md: 6 },
  };
  const { getList, getOne } = useDataProvider<Book | Category>();
  const { id } = useParams();
  const [categories, setCategories] = useState<Omit<Category, "id">[]>();
  const [book, setBook] = useState<Omit<Book, "id">>(INITIAL_BOOK);

  const handleChange = (name: string, value: any) => {
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (id) {
          const { data } = await getOne("books", +id);
          const category = await getList("categories");
          setBook(data as Book);
          setCategories(category.data as Category[]);
          setBook((prev) => ({
            ...prev,
            categoryName: categories?.at(0)?.name || 'Action'
          }));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <FormPaper resource="books" context={mode} data={book}>
      <FormContainer label="Reference">
        <Grid item {...grid.two}>
          <TextField
            label="Title"
            name="title"
            variant="filled"
            size="small"
            required
            fullWidth
            value={book.title}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Grid>

        <Grid item {...grid.two}>
          <TextField
            label="Author"
            name="author"
            variant="filled"
            size="small"
            required
            fullWidth
            value={book.author}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Grid>

        <Grid item {...grid.two}>
          <FormControl variant="filled" fullWidth size="small">
            <InputLabel>Select category</InputLabel>
            <Select
              label="categoryName"
              name="categoryName"
              value={book.categoryName}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              {(categories || []).map((category) => (
                  <MenuItem value={category.name} key={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item {...grid.two}>
          <TextField
            label="Page size"
            name="pageSize"
            variant="filled"
            size="small"
            required
            fullWidth
            value={book.pageSize}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Grid>
      </FormContainer>

      <FormContainer label="Manage">
        <Grid item {...grid.two}>
          <FormControl variant="filled" fullWidth size="small">
            <InputLabel>Select status</InputLabel>
            <Select
              label="Status"
              name="status"
              value={book.status || 'AVAILABLE'}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
            >
              <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
              <MenuItem value="TAKEN">TAKEN</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </FormContainer>
    </FormPaper>
  );
};
