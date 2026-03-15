import { createContext, useContext, useState } from "react";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [tableNumber, setTableNumber] = useState(null);
  const [isSeated, setIsSeated] = useState(false);

  const selectTable = (num) => {
    setTableNumber(num);
    setIsSeated(true);
  };

  const resetTable = () => {
    setTableNumber(null);
    setIsSeated(false);
  };

  return (
    <TableContext.Provider
      value={{ tableNumber, isSeated, selectTable, resetTable }}
    >
      {children}
    </TableContext.Provider>
  );
}

export const useTable = () => {
  const context = useContext(TableContext);
  if (!context) throw new Error("useTable must be used within TableProvider");
  return context;
};
