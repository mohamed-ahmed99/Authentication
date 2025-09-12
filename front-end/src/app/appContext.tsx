"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type GlobalStore = { [key: string]: any; };

type AppContextType = {
  store: GlobalStore;
  setStore: (key: string, value: any) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [store, setStoreState] = useState<GlobalStore>({});

  const setStore = (key: string, value: any) => {
    setStoreState((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <AppContext.Provider value={{ store, setStore }}>
      { children }
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("error");
  return context;
};
