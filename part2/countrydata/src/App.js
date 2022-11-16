import { useState, useEffect } from "react"
import axios from "axios"
import Input from "./components/Input"
import CountryList from "./components/CountryList"

const API_KEY = process.env.REACT_APP_OPENWEATHER_API

const App = () => {
  const [input, setInput] = useState("")
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(undefined)

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (res.status !== 200) console.log("Restcountries error:", res)
        else setCountries(res.data)
      })
      .catch((error) => console.log("Axios error:", error))
  }, [])

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(input.toLowerCase())
  )

  useEffect(() => {
    if (filteredCountries.length !== 1) {
      setWeather(undefined)
    } else {
      const city = filteredCountries[0].capital[0]
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        )
        .then((res) => {
          if (res.status !== 200) console.log("Openweather error:", res)
          else setWeather(res.data)
        })
        .catch((error) => console.log("Axios error:", error))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  const changeInput = (value) => {
    setInput(value)
  }

  return (
    <div className="App">
      <div>
        find countries <Input value={input} onChange={handleInputChange} />
      </div>
      <div>
        <CountryList
          countries={filteredCountries}
          changeInput={changeInput}
          weather={weather}
        />
      </div>
    </div>
  )
}

export default App
