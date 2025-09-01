// src/pages/Signup.jsx
import { useContext, useState } from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";
// import { AppContext } from "../store/useAppStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppStore } from "../store/useAppStore";
import { jwtDecode } from "jwt-decode";

export default function Signup() {
  const [isSignup, SetIsSignup] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const { backendUrl, setUserData, setIsLoggedin, reset } = useAppStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      if (isSignup) {
        const response = await axios.post(
          `${backendUrl}/api/user/register`,
          { fullname, email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data.success) {
          toast.success(response.data.message);
          setUserData(response.data.user);
          setIsLoggedin(true);
          navigate("/");
        }
      } else {
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
          localStorage.setItem("token", response.data.token);
          toast.success("Logged in successfully");
          setUserData(response.data.user);
          setIsLoggedin(true);
          navigate("/");
          const decoded = jwtDecode(response.data.token);
          const expiryTime = decoded.exp * 1000 - Date.now();
          setTimeout(() => {
            localStorage.removeItem("token");
            reset();
            toast.error("Session expired. Please login again");
          }, expiryTime);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <p className="text-center text-gray-500 mb-6">
          {isSignup ? "Create Account" : "Login"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </div>
          )}

          {/* Email */}
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

          {/* Password */}
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

          {/* Forgot password */}
          {!isSignup && (
            <div className="text-right">
              <a href="#" className="text-sm text-indigo-500 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className={
              "w-full py-2.5 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-indigo-500 to-indigo-600 hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
            }
            disabled={loader}
          >
            {loader && <Loader2 className="animate-spin" />}
            {isSignup ? "Signup" : "Login"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-600 mt-5 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => {
              SetIsSignup(!isSignup);
            }}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            {isSignup ? "Login here" : "Signup here"}
          </span>
        </p>
      </div>
    </div>
  );
}
