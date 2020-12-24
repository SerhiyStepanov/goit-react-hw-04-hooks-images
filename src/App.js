import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Searchbar from "./Components/Searchbar";
import "./App.css";

export default function App() {
  const [search, setSearch] = useState("");

  const handleFormSubmit = (search) => {
    setSearch(search);
  };

  return (
    <div>
      <Searchbar formSubmit={handleFormSubmit} />

      <ToastContainer />
    </div>
  );
}
