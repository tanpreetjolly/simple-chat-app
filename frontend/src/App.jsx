import {
  createBrowserRouter,
  RouterProvider,
  Outlet, 
  ScrollRestoration,
} from "react-router-dom";
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import { AuthProvider } from "./context/authContext";
import axios from "axios"
const Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <ScrollRestoration />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "users/:id/verify/:token",
        element: <VerifyEmail />,
      },
    ],
  },
]);

function App() {
  axios.defaults.baseURL = 'http://localhost:4040';
  axios.defaults.withCredentials = true;
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster />
      </AuthProvider>
    </>
  );
}

export default App;
