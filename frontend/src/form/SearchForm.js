import React, { useState } from "react";

//Using this searchform for search ComnpaniesList and JobList component

function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState("");
  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name={searchTerm}
          value={searchTerm}
          placeholder="Enter the key"
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-lg btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
export default SearchForm;