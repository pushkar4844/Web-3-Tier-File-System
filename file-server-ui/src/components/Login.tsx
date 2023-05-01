import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AppContext from "../AppContext";

export const Login = (): JSX.Element => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { isAuthenticated, setToken, setIsAuthenticated } =
    React.useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (token != null && token !== "" && isAuthenticated) {
      setToken(token);
      navigate("/files");
    }
  }, [isAuthenticated]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log(email, password);
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log({ res });
        const data = res.data;
        const { token } = data;
        window.sessionStorage.setItem("token", token);
        setToken(token);
        setIsAuthenticated(true);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-sm">
          <div className="flex flex-col bg-white rounded-lg shadow-lg">
            <h1 className="text-center text-3xl font-monsterrat font-semibold">
              Login
            </h1>
            <form className="w-full p-6" onSubmit={handleSubmit}>
              <div className="flex flex-wrap mb-6 font-poppins">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="p-3 bg-gray-200 rounded form-input w-full"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Password:
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="p-3 bg-gray-200 rounded form-input w-full"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-monsterrat py-2 px-4 rounded"
                >
                  Login
                </button>
                <Link
                  to="/register"
                  className="text-blue-500 hover:text-blue-700 font-monsterrat py-2 rounded ml-auto"
                >
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
