import { useContext, useEffect, useState } from "react";
import { User, Mail, Lock, Loader2 } from "lucide-react";
// import { AppContext } from "../store/useAppStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAppStore } from "../store/useAppStore";

export default function EmailVerification() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { backendUrl, userData, setIsLoggedin, reset } = useAppStore();

  useEffect(() => console.log(userData), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${backendUrl}/api/user/verify-email`, {
        email: userData.email,
        otp,
      });

      if (response.data.success) {
        console.log(response);
        toast.success(response.data.message || "Email verified successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[550px] bg-gradient-to-r from-indigo-50 via-white to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Email Verification
        </h2>
        <p className="text-center text-gray-500 mb-6">Verify Your Email</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="number"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="OTP"
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <p className="ml-3">OTP will expire in 10 minutes</p>

          <button
            type="submit"
            className={
              "w-full py-2.5 rounded-xl text-white font-semibold shadow-md bg-gradient-to-r from-indigo-500 to-indigo-600 hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-2"
            }
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
