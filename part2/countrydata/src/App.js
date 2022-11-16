import { useState, useEffect } from "react"
import axios from "axios"
import Input from "./components/Input"
import CountryList from './components/CountryList'

const App = () => {
  const [input, setInput] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.data) console.log("API error, no data")
        else setCountries(res.data)
      })
      .catch((error) => console.log("Axios error:", error))
  }, [])

  const handleInputChange = (event) => {
    setInput(event.target.value)
  }

  const changeInput = (value) => {
    setInput(value)
  }

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(input.toLowerCase())
  )

  return (
    <div className="App">
      <div>
        find countries <Input value={input} onChange={handleInputChange} />
      </div>
      <div>
        <CountryList countries={filteredCountries} changeInput={changeInput} />
      </div>
    </div>
  )
}

export default App
