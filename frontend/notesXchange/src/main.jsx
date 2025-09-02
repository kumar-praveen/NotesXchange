import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import About from "./pages/About.jsx";
import NotesPage from "./pages/NotesPage.jsx";
import NotePreview from "./components/NotePreview.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/notes",
        element: <NotesPage />,
      },
      {
        path: "/notes/:id",
        element: <NotePreview />,
      },
      {
        path: "/verify-email",
        element: <EmailVerification />,
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <AppContextProvider> */}
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    {/* </AppContextProvider> */}
  </StrictMode>
);
