import { useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

export default function Searchbar({ formSubmit }) {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (e) => {
    setSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      toast.warn("Enter please search parameters !", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      return;
    }
    formSubmit(search);
    setSearch("");
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleChangeSearch}
          className={s.SearchFormInput}
          type="text"
          name="search"
          value={search}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  formSubmit: PropTypes.func,
};
