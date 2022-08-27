import React from "react";
import {
  GridActionsCellItem,
  GridColDef,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { Book } from "../../../../types/model";
import { Box, Button } from "@mui/material";
import { useDataProvider } from "../../../../utils/hooks";
import { centerRow } from "../../../../common/data/centerRow";
import { Table } from "../../../../common/components/Table";

export const BookList = () => {
  const { getList } = useDataProvider<Book>();
  const [rows, setRows] = React.useState<Book[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getList("books");
        setRows(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const gridColDef: GridColDef[] = React.useMemo(
    () => [
      {
        field: "id",
        type: "number",
      },
      {
        ...centerRow,
        field: "title",
        headerName: "Title",
        type: "string",
        flex: 1,
      },
      {
        ...centerRow,
        field: "author",
        headerName: "Author",
        type: "string",
      },
      {
        ...centerRow,
        field: "categoryName",
        headerName: 'Category',
        type: "string",
        flex: 1,
      },
      {
        field: "pageSize",
        headerName: "Page number",
        type: "string",
        align: "center",
      },
      {
        field: 'loanNumber',
        headerName: 'Loan number',
        type: 'number'
      }
    ],
    []
  );

  const renderDataTable = React.useCallback(
    () => <Table resource="books" rows={rows} columns={gridColDef} />,
    [rows, gridColDef]
  );

  return renderDataTable();
};
