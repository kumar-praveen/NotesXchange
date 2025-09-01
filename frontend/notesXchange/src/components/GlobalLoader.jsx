import { Loader2 } from "lucide-react";
import { useAppStore } from "../store/useAppStore";

export default function GlobalLoader() {
  const loading = useAppStore((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
        <Loader2 className="animate-spin h-10 w-10 text-indigo-600" />
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
          Loading...
        </p>
      </div>
    </div>
  );
}
