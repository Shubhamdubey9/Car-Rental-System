import React, { useState } from "react";
import api from "../../Api/Axios";
import { useAppContext } from "../../AppContext/useAppContext"; // fixed import path
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setShowLogin, setUser, fetchUser } = useAppContext();
  const navigate = useNavigate();

  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (state === "login") {
        const res = await api.post("/user/login",
          { email, password }
        );

        if (res.data?.user && res.data?.token) {
          await fetchUser(); 
          setShowLogin(false);
          navigate(res.data.user.role === "owner" ? "/owner" : "/");
        } else {
          setError(res.data?.message || "Invalid credentials");
        }
      } else {
        // Registration
        const res = await api.post("/user/register",
          { name, email, password, role }
        );

        if (res.data?.success) {
          await fetchUser(); // fetch new user and update context
          setShowLogin(false);
          navigate(role === "owner" ? "/owner" : "/");
        } else {
          setError(res.data?.message || "Registration failed");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-5 m-auto items-start w-full max-w-xs sm:max-w-md md:max-w-lg rounded-2xl shadow-2xl border border-gray-200 bg-white px-4 py-6 sm:px-8 sm:py-10"
      >
        <p className="text-2xl sm:text-3xl font-semibold m-auto mb-2">
          <span className="text-indigo-500">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {error && (
          <div className="text-red-500 text-sm w-full text-center">{error}</div>
        )}

        {state === "register" && (
          <>
            <div className="w-full">
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 rounded-lg w-full"
              />
            </div>

            <div className="w-full">
              <label className="block mb-1 font-medium">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border p-3 rounded-lg w-full"
              >
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </>
        )}

        <div className="w-full">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <div className="w-full">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-lg w-full"
          />
        </div>

        <p className="text-sm mt-2">
          {state === "login" ? (
            <>
              Create an account?{" "}
              <span
                className="text-indigo-500 hover:underline cursor-pointer"
                onClick={() => setState("register")}
              >
                click here
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-indigo-500 hover:underline cursor-pointer"
                onClick={() => setState("login")}
              >
                click here
              </span>
            </>
          )}
        </p>

        <button
          disabled={loading}
          className="bg-indigo-500 hover:bg-indigo-600 text-white w-full py-3 rounded-lg font-semibold mt-2"
        >
          {loading
            ? state === "register"
              ? "Creating..."
              : "Logging in..."
            : state === "register"
            ? "Create Account"
            : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
