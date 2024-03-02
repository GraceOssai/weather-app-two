import "./App.css";
import Search from "./components/Search";
import CurrentWeather from "./components/current-weather/CurrentWeather";
import { WEATHER_API_URL } from "./api";
import { WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forcast/Forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forcastWeather, setForecastWeather] = useState(null);
  
  console.log(forcastWeather)
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split("");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );
    const forcastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    Promise.all([currentWeatherFetch, forcastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forcastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forcastWeather);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forcastWeather && <Forecast data={forcastWeather} />}
    </div>
  );
}

export default App;
