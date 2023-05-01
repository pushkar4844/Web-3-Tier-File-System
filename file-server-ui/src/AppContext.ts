import React from "react";

// setIsAuthenticated is of type Dispatch<SetStateAction<string>>

const token = window?.sessionStorage?.getItem("token");
const AppContext = React.createContext({
  token,
  isAuthenticated: token?.length !== 0,
  setToken: (() => {}) as React.Dispatch<React.SetStateAction<string>>,
  setIsAuthenticated: (() => {}) as React.Dispatch<
    React.SetStateAction<boolean>
  >,
});

export default AppContext;
