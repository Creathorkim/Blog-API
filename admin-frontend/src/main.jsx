import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { SignUp } from "../src/pages/SignUp";
import { Login } from "./pages/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import { Home } from "./pages/Proile";
import { CreateNew } from "./pages/NewPost";
import { PostPage } from "./pages/PostPage";
import { EditPost } from "./pages/EditPost";
const router = createBrowserRouter([
  {
    path: "auth",
    element: <App />,
    children: [
      { index: true, element: <SignUp /> },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "createNew", element: <CreateNew /> },
      { path: "postDetail/:id", element: <PostPage /> },
      { path: "post/:id/edit", element: <EditPost /> },
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
