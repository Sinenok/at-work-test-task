climport React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditPage from "./pages/EditPage";
import Header from "./components/Header";
import "./styles/main.css";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </>
  );
};

export default App;
