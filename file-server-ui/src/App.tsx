import React, { useContext, useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import AppContext from "./AppContext";
import { Files } from "./components/Files";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

const PrivateRoute = ({
  auth: { isAuthenticated },
  children,
}: {
  auth: { isAuthenticated: boolean };
  children: JSX.Element;
}): JSX.Element => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App(): JSX.Element {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [token, setToken] = React.useState("");
  console.log("App", { isAuthenticated, token });

  useEffect(() => {
    const sessionToken = window.sessionStorage.getItem("token");
    if (sessionToken != null && sessionToken !== "" && !isAuthenticated) {
      setToken(sessionToken);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated, token]);

  const router = createBrowserRouter([
    {
      path: "/files",
      element: (
        <PrivateRoute auth={{ isAuthenticated }}>
          <AppContext.Provider
            value={{ isAuthenticated, token, setToken, setIsAuthenticated }}
          >
            <Files />
          </AppContext.Provider>
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <AppContext.Provider
          value={{ isAuthenticated, token, setToken, setIsAuthenticated }}
        >
          <Login />
        </AppContext.Provider>
      ),
    },
    {
      path: "/register",
      element: (
        <AppContext.Provider
          value={{ isAuthenticated, token, setToken, setIsAuthenticated }}
        >
          <Register />
        </AppContext.Provider>
      ),
    },
    {
      path: "*",
      element: <Navigate to="/files" />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
