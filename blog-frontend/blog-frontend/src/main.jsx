import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import HomePage from "./pages/home.jsx";
import SignUp from "./pages/signUp.jsx";
import Login from "./pages/login.jsx";
import PostPage from "./pages/postPage.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "posts",
        element: <PostPage />,
      },
      {
        path: "posts/:id",
        element: <PostDetail />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
