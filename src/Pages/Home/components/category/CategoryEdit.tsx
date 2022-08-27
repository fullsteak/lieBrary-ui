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
import { grid } from "../../../../common/data/grid";

const INITIAL_CATEGORY: Omit<Category, "id"> = {
  name: '',
};

export const CategoryEdit: FC<EditProps> = ({ mode }) => {
  const { getOne } = useDataProvider<Category>();
  const [category, setCategory] = useState<Partial<Category>>(INITIAL_CATEGORY);
  const { id } = useParams();

  const handleChange = (name: string, value: any) => {
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (id) {
          const { data } = await getOne("categories", +id);
          setCategory(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <FormPaper resource="category" context={mode} data={category}>
      <FormContainer label="Reference">
        <Grid item {...grid.two}>
          <TextField
            label="Name"
            name="name"
            variant="filled"
            size="small"
            required
            fullWidth
            value={category.name}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </Grid>
      </FormContainer>
    </FormPaper>
  );
};
