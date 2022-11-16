import React from "react"
import Country from "./Country"

const CountryList = ({ countries, changeInput, weather }) => {
  if (countries === undefined) return <div>Loading from API...</div>
  if (countries.length === 0) return <div>No matching countries</div>
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (countries.length === 1) {
    return (
      <div>
        <Country data={countries[0]} weather={weather} />
      </div>
    )
  }
  return (
    // 2-10 countries
    <>
      {countries.map((c) => {
        return (
          <div key={c.name.common}>
            {c.name.common}{" "}
            <button onClick={() => changeInput(c.name.common)}>show</button>
          </div>
        )
      })}
    </>
  )
}

export default CountryList
