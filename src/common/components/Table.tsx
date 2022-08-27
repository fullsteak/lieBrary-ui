import React from "react";
import {
  DataGrid,
  GridEventListener,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Table as propTypes } from "../../types";
import { useNavigate } from "react-router-dom";
import { IconButton, Stack } from "@mui/material";
import { AddOutlined as Add } from "@mui/icons-material";

export const Table: React.FC<propTypes> = ({ resource, updatable = true, ...restProps }) => {
  const [pageSize, setPageSize] = React.useState(5);
  const navigate = useNavigate();

  const handleClick: GridEventListener<"rowClick"> = ({ id }) => {
    navigate(`/home/${resource}/${id}`);
  };

  const MyToolbar = () => (
    <GridToolbarContainer
      sx={{
        justifyContent: "space-between",
      }}
    >
      <GridToolbarQuickFilter />

      <Stack direction="row" spacing={2}>
        <GridToolbarExport />
        <IconButton onClick={() => navigate(`/home/${resource}/create`)}>
          <Add />
        </IconButton>
      </Stack>
    </GridToolbarContainer>
  );

  return (
    <DataGrid
      sx={{
        height: "100%",
        backgroundColor: "#fff",
      }}
      onRowClick={(params, event, details) => updatable ? handleClick(params, event, details) : ''}
      checkboxSelection
      filterMode="client"
      pageSize={pageSize}
      onPageSizeChange={(newPage) => setPageSize(newPage)}
      disableDensitySelector
      disableColumnSelector
      disableColumnFilter
      rowsPerPageOptions={[5, 10, 25, 50]}
      components={{ Toolbar: MyToolbar }}
      {...restProps}
    />
  );
};
