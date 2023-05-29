
import './App.css';
import Search from './Components/Search';
import ForeCast from './Components/Forecast';
import CurrentWeather from './Components/Current-weather';
import { weatherApiURL, weatherApiKey } from './Components/api';
import { useState } from 'react';
function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData)
    const [lat, lon] = searchData.value.split(" ")
    const currentWeatherFetch = fetch(`${weatherApiURL}/weather?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
    const forecastFetch = fetch(`${weatherApiURL}/forecast?lat=${lat}&lon=${lon}&appid=${weatherApiKey}&units=metric`)
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecastWeather({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  }
  console.log(forecastWeather);
  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecastWeather && <ForeCast data={forecastWeather} />}
    </div>
  );
}

export default App;
