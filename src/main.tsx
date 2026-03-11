import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllPizza from "./pages/AllPizza";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import OnePizza from "./pages/OnePizza";
import CreatePizza from "./pages/CreatePizza";
import UpdatePizza from "./pages/UpdatePizza";
import LoginPage from "./pages/LoginPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllPizza />} />
        <Route path="/kosar" element={<Cart />} />
        <Route path="/create" element={<CreatePizza />} />
        <Route path="/onePizza/:id" element={<OnePizza />} />
        <Route path="/updatePizza/:id" element={<UpdatePizza />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
    <ToastContainer theme="colored" />
  </StrictMode>,
);
