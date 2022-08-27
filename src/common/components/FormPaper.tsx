import React from "react";
import {
  Container,
  Divider,
  Paper,
  Toolbar,
} from "@mui/material";
import { FormPaper as propTypes } from "../../types/data/FormPaper";
import { ActionBar } from "./ActionBar";

export function FormPaper({ children, ...restProps }: propTypes) {
  return (
    <Paper
      sx={{
        height: '100%',
        border: "1px solid rgb(0, 0, 0, 0.1)",
        borderRadius: "0.6rem",
        display: 'grid',
        gridTemplateRows: 'auto 1fr'
      }}
      elevation={0}
    >
      <Container>
        {children}
      </Container>

      <Divider />
      <Toolbar
        sx={{
          backgroundColor: '#F5F5F5',
          borderRadius: "0 0 0.6rem 0.6rem",
        }}
      >
        <ActionBar {...restProps} />
      </Toolbar>
    </Paper>
  );
}
