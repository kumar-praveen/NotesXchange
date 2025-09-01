import { Toaster } from "react-hot-toast";
import App from "../App";
import GlobalLoader from "../components/GlobalLoader";

function AppLayout() {
  return (
    <>
      <Toaster />
      <GlobalLoader/>
      <App/>
    </>
  );
}

export default AppLayout;
