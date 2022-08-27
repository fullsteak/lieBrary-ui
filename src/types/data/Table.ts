import { DataGridProps, GridColDef } from "@mui/x-data-grid"

export type Table = {
  columns: GridColDef[];
  rows: any[];
  updatable?: boolean;
  resource: string;
  dataGrid?: Partial<DataGridProps>;
}
