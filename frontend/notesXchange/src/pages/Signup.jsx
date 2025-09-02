import {  useState } from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppStore } from "../store/useAppStore";

export default function Signup() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const { backendUrl, setUserData, userData } = useAppStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
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
        setUserData(response.data.user);
        toast.success(response.data.message);
        navigate("/verify-email");
      } else {
        toast.error("Failed to verify otp");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message);
      navigate("/");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">Create Your Account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className={
              "w-full py-2.5 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-indigo-500 to-indigo-600 hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
            }
            disabled={loader}
          >
            {loader && <Loader2 className="animate-spin" />}
            Signup
          </button>
        </form>

        <p className="text-center text-gray-600 mt-5 text-sm">
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-medium hover:underline cursor-pointer"
          >
            {" "}
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
