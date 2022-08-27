import React from "react";
import {
  GridColDef,
} from "@mui/x-data-grid";
import { Category } from "../../../../types/model";
import { useDataProvider } from "../../../../utils/hooks";
import { Table } from "../../../../common/components/Table";
import { centerRow } from "../../../../common/data/centerRow";

export const CategoryList = () => {
  const { getList } = useDataProvider<Category>();
  const [rows, setRows] = React.useState<Category[]>([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await getList("categories");
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
        headerName: 'Id',
        type: "number",
      },
      {
        field: 'name',
        headerName: 'Name',
        type: 'number',
        flex: 1,
        ...centerRow
      }
    ],
    []
  );

  const renderDataTable = React.useCallback(
    () => <Table resource="category" rows={rows} columns={gridColDef} />,
    [rows, gridColDef]
  );

  return renderDataTable();
};
