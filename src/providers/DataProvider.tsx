import React, { useMemo, useState } from "react";
import axios from "axios";
import environment from "../conf/environment";
import { dataProviderContext } from "../utils/context/dataProviderContext";
import { WithChildren } from "../types";
import { DataProvider as dataProviderType } from "./types/dataProvider";
import { HEADER_AUTH } from './AuthProvider';

export function DataProvider({ children }: WithChildren) {

  const getList = (resource: string) => axios.get(`${environment.apiBaseURL}/${resource}`, {
    params: {
      pageSize: 3,
      page: 1
    },
    headers: HEADER_AUTH()
  });

  const getOne = (resource: string, id: number) =>
    axios.get(`${environment.apiBaseURL}/${resource}/${id}`, {
      headers: HEADER_AUTH()

    });

  const deleteOne = (resource: string, id: number) =>
    axios.delete(`${environment.apiBaseURL}/${resource}/${id}`, {
      headers: HEADER_AUTH()
    });

  const save = (resource: string, props: unknown) =>
    axios.put(`${environment.apiBaseURL}/${resource}`, [props], {
      headers: HEADER_AUTH()
    });

  const update = (resource: string, id: number, props: unknown) =>
    axios.put(`${environment.apiBaseURL}/${resource}/${id}`, props, {
      headers: HEADER_AUTH()
    });

  const methodToProvide = useMemo<dataProviderType>(
    () => ({
      getList,
      save,
      update,
      getOne,
      deleteOne,
    }),
    []
  );

  return (
    <dataProviderContext.Provider value={methodToProvide}>
      {children}
    </dataProviderContext.Provider>
  );
}
