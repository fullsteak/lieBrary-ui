import React from "react";
import {
  GridColDef,
} from "@mui/x-data-grid";
import { Book, Loan } from "../../../../types/model";
import { useDataProvider } from "../../../../utils/hooks";
import { centerRow } from "../../../../common/data/centerRow";
import { Table } from "../../../../common/components/Table";

export const LoanList = () => {
  const { getList } = useDataProvider<Loan>();
  const [rows, setRows] = React.useState<Loan[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getList("loans");
        setRows(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const gridColDef: GridColDef<Loan>[] = React.useMemo(
    () => [
      {
        field: "id",
        type: "number",
      },
      {
        ...centerRow,
        field: "restBook",
        headerName: "Book",
        flex: 1,
        valueFormatter: ({value}) => {
          return (value as Book).title
        },
        type: "string",
      },
      {
        ...centerRow,
        field: "loanDate",
        headerName: "Loan date",
        valueFormatter: ({value}) => {
          return value.split('T')[0];
        },
        type: "string",
        flex: 1,
      },
    ],
    []
  );

  const renderDataTable = React.useCallback(
    () => <Table resource="loans" rows={rows} columns={gridColDef} updatable={false} />,
    [rows, gridColDef]
  );

  return renderDataTable();
};
