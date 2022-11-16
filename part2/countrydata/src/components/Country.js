import React from "react"

const Country = ({ data }) => {
  const { capital, area } = data
  const name = data.name.common
  const flag = data.flags.png

  const langKeys = Object.keys(data.languages)
  const languages = langKeys.map((key) => data.languages[key])

  return (
    <>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <h3>Languages:</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={flag}
        alt="flag"
        style={{ boxShadow: "5px 5px 10px gray", width: "200px" }}
      />
    </>
  )
}

export default Country
