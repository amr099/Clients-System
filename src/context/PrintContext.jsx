import React, { createContext, useState } from "react";

export const PrintContext = createContext();

export const PrintContextProvider = ({ children }) => {
  const [printMode, setPrint] = useState(false);
  return (
    <PrintContext.Provider value={{ printMode, setPrint }}>
      {children}
    </PrintContext.Provider>
  );
};
