import { useState } from "react";
import { Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppStore } from "../store/useAppStore";
import { jwtDecode } from "jwt-decode";
import { errorHandler } from "../lib/utils";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const { backendUrl, setUserData, setIsLoggedin, reset } = useAppStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      const response = await axios.post(
        `${backendUrl}/api/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Logged in successfully");
        setUserData(response.data.user);
        setIsLoggedin(true);
        navigate("/");
      }
    } catch (err) {
      errorHandler(err, setUserData, setIsLoggedin, navigate);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-100 px-3">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">Login</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email ID"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-indigo-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className={
              "w-full py-2.5 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-indigo-500 to-indigo-600 hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
            }
            disabled={loader}
          >
            {loader && <Loader2 className="animate-spin" />}
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-5 text-sm">
          Don't have account?
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            {" "}
            Signup here
          </span>
        </p>
      </div>
    </div>
  );
}
