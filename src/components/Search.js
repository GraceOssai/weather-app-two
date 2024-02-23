import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({onSearchChange}) => {
  const [search, setSearch] = useState(null);
  // const [search, setSearch] = useState("");

  const handleOnChange = (searchData) => {
    //  SearchData is the data that we entered in our input field (asyncPaginate). That data wil be retrieved in our handleOnChange function.
    setSearch(searchData);
    onSearchChange(searchData);
  };

  // const handleChange = (event) => {
  //   setSearch(event.target.value)
  //   console.log(event.target.value)
  // }

  return (
    <div>
      {/* AsyncPaginate is a package we installed that represents our input field. */}
      {/* It take all the attributes an input takes, attributes like onChange, value, placeholder e.t.c */}
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
      />

      {/* <input
        type="text"
        placeholder="Search for City"
        onChange={handleChange}
        value={search}
      /> */}
    </div>
  );
};

export default Search;
