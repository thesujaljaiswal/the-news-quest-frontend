import React from "react";
import Register from "./components/register/Register.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop/ScrollToTop.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import AddArticle from "./pages/AddArticle.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ScrollToTop>
          <LandingPage />
        </ScrollToTop>
      ),
    },
    {
      path: "/register",
      element: (
        <ScrollToTop>
          <RegisterPage />
        </ScrollToTop>
      ),
    },
    {
      path: "/login",
      element: (
        <ScrollToTop>
          <LoginPage />
        </ScrollToTop>
      ),
    },
    {
      path: "/add/article",
      element: (
        <ScrollToTop>
          <AddArticle />
        </ScrollToTop>
      ),
    },
    {
      path: "/news/:id",
      element: (
        <ScrollToTop>
          <Register />
        </ScrollToTop>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
