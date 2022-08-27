import { Context as reactContext, createContext } from "react";

type ReWrittenContext = {
  <T = unknown>(defaultValue?: T): reactContext<T>;
}

export const dataProviderContext = (<unknown>createContext as ReWrittenContext)();
