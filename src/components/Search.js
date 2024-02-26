import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = async (inputValue) => {
    //   inputValue here is the value the user is typing in the input. This is the same as the searchData but only used differently
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
//     try {
// 	const response = await fetch(GEO_API_URL, geoApiOptions);
// 	const result = await response.text();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
  };

  const handleOnChange = (searchData) => {
    //  SearchData is the data that the user enters in the input field (asyncPaginate). That data wil be retrieved in our handleOnChange function.
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <div>
      {/* AsyncPaginate is a package we installed that represents our input field. */}
      {/* It take all the attributes an input takes, attributes like onChange, value, placeholder e.t.c */}
      <AsyncPaginate
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        // The loadOptions above helps us to fetch data. For example, when we are searching for london
        // and we type 'lon', it will search the api to find all the cities with the prefix 'lon'...
      />
    </div>
  );
};

export default Search;
