import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./country.scss";
const Country = () => {
  const [country, setCountry] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    const fetchCountryData = async () => {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${name}`
      );
      const country = await response.json();
      setCountry(country);
      console.log(country);
    };

    fetchCountryData();
  }, []);

  return (
    <>
      <section className="country">
        <Link to="/" className="btn backbtn">
          Back Home
        </Link>
        {country.map((c, index) => {
          const { cca2, name, population, area, flags } = c;

          return (
            <article key={cca2}>
              <div className="flag">
                <img
                  className="detailedFlag"
                  src={flags.svg}
                  alt={name.common}
                ></img>{" "}
              </div>
              <div className="country-details">
                <div>
                  <h2>
                    Name: <span>{c.name.common}</span>
                  </h2>
                  <h5>
                    Population: <span>{population}</span>
                  </h5>
                  <h5>
                    Area: <span>{area} km²</span>
                  </h5>
                  <h5>
                    {`Currency: `}
                    <span>
                      {country[index].currencies
                        ? Object.keys(country[0].currencies).map((key) => {
                            return (
                              <span>{country[0].currencies[key].name} </span>
                            );
                          })
                        : "None"}
                    </span>
                  </h5>
                  <h5>
                    {`Launguage(s): `}
                    <span>
                      {country[index].languages
                        ? Object.keys(country[0].languages).map((key) => {
                            return country[0].languages[key] + " ";
                          })
                        : "None"}
                    </span>
                  </h5>
                  <h5>
                    {`Neighbour(s): `}
                    <span>
                      {country[index].borders
                        ? Object.keys(c.borders).map((key) => {
                            return c.borders[key] + " ";
                          })
                        : "None"}
                    </span>
                  </h5>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
};

export default Country;
