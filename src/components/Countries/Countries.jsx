import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filter from "../Filter/Filter";

const url = "https://restcountries.com/v3.1/all"; //api all of the countries

const Countries = () => {
  const [countries, setCountries] = useState([]); //takes the space when we fetch data
  const [filtered, setFiltered] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(url); // fetching url
      const countries = await response.json();
      setCountries(countries);
      setIsLoading(false);
    };
    fetchCountryData();
  }, []);

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

  return (
    //puting all in a nameless div, and a grid to be able to manipulate looks
    <>
      <Filter
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        setFiltered={setFiltered}
        setCountries={setCountries}
        countries={countries}
      />
      {isLoading ? (
        <h1 className="loading">Loading</h1>
      ) : searchInput.length > 1 ? (
        <section className="grid">
          {filtered.map((country) => {
            const { name, flags } = country;

            return (
              <article key={name.common}>
                <div>
                  <img src={flags.svg} />
                  <div className="boxed">
                    <h4 className="countryName">{name.common}</h4>
                    <div className="button">
                      <Link to={`/countries/${name.common}`} className="btn">
                        Show more
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <section className="grid">
          {countries.map((country) => {
            const { name, flags } = country;

            return (
              <article key={name.common}>
                <div>
                  <img src={flags.svg} />
                  <div className="boxed">
                    <h4 className="countryName">{name.common}</h4>
                    <div className="button">
                      <Link to={`/countries/${name.common}`} className="btn">
                        Show more
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </>
  );
};

export default Countries;
