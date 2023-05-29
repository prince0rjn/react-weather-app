import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiURL, geoApiOptions } from "./api";

const Search = (props) => {
    const [search, setSearch] = useState(null);

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(`${geoApiURL}?minPopulation=100000&&namePrefix=${inputValue}`, geoApiOptions);
            const result = await response.json();

            if (response.ok) {
                return {
                    options: result.data.map((city) => ({
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    })),
                };
            } else {
                // Handle the error case
                console.error(`API Error: ${result.error}`);
                return { options: [] };
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        props.onSearchChange(searchData);
    }
    return (
        <AsyncPaginate
            placeholder="Search for city"
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
};
export default Search;