import axios from "axios";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = (): JSX.Element => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [register, setRegister] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (register) {
      navigate("/login");
    }
  }, [register]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_ENDPOINT}/register`, {
        email,
        password,
        firstName,
        lastName,
      })
      .then((res) => {
        console.log({ res });
        setRegister(true);
      });
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md">
          <div className="flex flex-col bg-white rounded-lg shadow-lg">
            <h1 className="text-center text-3xl font-monsterrat font-semibold">
              Register
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
              <div className="flex flex-wrap mb-6">
                <label
                  htmlFor="firstName"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  First Name:
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="p-3 bg-gray-200 rounded form-input w-full"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap mb-6">
                <label
                  htmlFor="lastName"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Last Name:
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="p-3 bg-gray-200 rounded form-input w-full"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-wrap">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-monsterrat py-2 px-4 rounded"
                >
                  Register
                </button>
                <Link
                  to="/login"
                  className="text-blue-500 hover:text-blue-700 font-monsterrat py-2 rounded ml-auto"
                >
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
