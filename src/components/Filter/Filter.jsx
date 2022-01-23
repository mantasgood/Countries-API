import React, { useEffect } from "react";

const Filter = ({
  searchInput,
  setSearchInput,
  setFiltered,
  setCountries,
  countries,
}) => {
  const regions = [
    {
      name: "Filter by region",
      desc: "All",
    },
    {
      name: "Africa",
      desc: "Africa",
    },
    {
      name: "Americas",
      desc: "Americas",
    },
    {
      name: "Asia",
      desc: "Asia",
    },
    {
      name: "Europe",
      desc: "Europe",
    },
    {
      name: "Oceania",
      desc: "Oceania",
    },
  ];

  // Stops reload when a form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // search of countries
  const searchCountries = (searchValue) => {
    setSearchInput(searchValue);

    if (searchInput) {
      const filteredCountries = countries.filter((country) =>
        Object.values(country)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFiltered(filteredCountries);
    } else {
      setFiltered(countries);
    }
  };

  // continent filter

  const filterRegions = async (region) => {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    const res = await fetch(url);
    const data = await res.json();
    setCountries(data);
  };

  useEffect(() => {
    filterRegions();
  }, []);

  return (
    <section className="filter">
      {/* filter start */}
      <div className="continents-filter">
        <select
          name="select"
          id="select"
          className="select"
          onChange={(e) => filterRegions(e.target.value)}
          value={regions.name}
        >
          <option value="Filter by continent">Filter by continent</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <form className="form-control" id="form" onSubmit={handleSubmit}>
        {/* search start */}
        <input
          type="search"
          name="search"
          id="search"
          autoComplete="off"
          placeholder="Type a country name"
          onChange={(e) => searchCountries(e.target.value)}
        />
      </form>
    </section>
  );
};

export default Filter;
