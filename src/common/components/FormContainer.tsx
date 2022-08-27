import React from "react";
import { FormGroup, Typography, Grid } from "@mui/material";
import { FormContainer as propTypes } from "../../types/data/FormContainer";

export const FormContainer = ({
  children,
  label,
}: propTypes) => (
  <FormGroup
    sx={{
      pb: 3,
      maxWidth: "40rem",
    }}
  >
    <Typography variant="h6" component="h2" paddingY={2}>
      {label}
    </Typography>

    <Grid container spacing={2}>
      {children}
    </Grid>
  </FormGroup>
);
