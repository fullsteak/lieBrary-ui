import { useContext } from "react";
import { DataProvider } from "../../providers/types/dataProvider";
import { dataProviderContext } from "../context/dataProviderContext";

export const useDataProvider = <T = any>() => (
  useContext(dataProviderContext) as DataProvider<T>
);
