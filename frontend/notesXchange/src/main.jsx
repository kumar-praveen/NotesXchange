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
import Auth from "./pages/Auth.jsx";
import NotePreview from "./components/NotePreview.jsx";

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
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/notes",
        element: <NotesPage />,
      },
      {
        path: "/notes/:id",
        element: <NotePreview />,
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
