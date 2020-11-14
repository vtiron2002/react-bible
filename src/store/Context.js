import React, { createContext, useContext, useReducer } from "react";
import initState from "./initState";
import reducer from "./reducer";

const BibleContext = createContext();

const ContextProvider = ({ children }) => {
  return (
    <BibleContext.Provider value={useReducer(reducer, initState)}>
      {children}
    </BibleContext.Provider>
  );
};

export const useBibleContext = () => useContext(BibleContext);

export default ContextProvider;
