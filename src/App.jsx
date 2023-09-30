import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import image from "../src/assets/weather.svg";


const API_KEY = "fb9a1444ba0719551b596b9e04aa8a7a";
function App() {
  const [weather, setweather] = useState(null);
  const [city, setcity] = useState("");
  const [err, seterr] = useState(null);
  const [temperatureClass, setTemperatureClass] = useState("weather-rainy");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setweather(response.data);
      seterr(null);

      const temperatureValue = response.data.main.temp;

      if (temperatureValue >= 30) {
        setTemperatureClass("weather-hot");
      } else if (temperatureValue >= 20) {
        setTemperatureClass("weather-sunny");
      } else if (temperatureValue >= 10) {
        setTemperatureClass("weather-cloudy");
      } else {
        setTemperatureClass("weather-cold");
      }
    } catch (err) {
      setweather(null);
      seterr("City not found. Please enter a valid city name.");
    }
  };

  const cityHandler = (e) => {
    setcity(e.target.value);
  };

  const searchHandler = () => {
    fetchData();
    setcity("");
  };

  return (
    <>
      <h1 className={`app-title`}>
        <img src={image} alt="Weather App Icon" /> Weather App
      </h1>
      <div className={`mainContainer ${temperatureClass}`}>
        <div className="container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              value={city}
              onChange={cityHandler}
              placeholder="Enter city name"
            />
            <button className="search-button" onClick={() => searchHandler()}>
              Search City
            </button>
          </div>

          {weather && (
            <div className={`card`}>
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          )}
          {err && <p>{err}</p>}
        </div>
      </div>
    </>
  );
}

export default App;
