import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex bg-gradient-to-r from-indigo-50 via-white to-indigo-100 py-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
