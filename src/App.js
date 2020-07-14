import React, { useState } from "react";
import Page404 from "./Page404";
const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "4cf28b3d6a6c3974dfe74125bc510946",
};
console.log(process.env.REACT_APP_API_URL);
function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const search = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}weather?q=${query}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data);
      });
    document.getElementById("search-box").value = "";
  };
  const img = weather && weather.weather ? weather.weather[0].main : "";
  return (
    <div className="weather-container" id={img ? img : "Clear"}>
      {weather.cod === "404" && <Page404 />}

      <form onSubmit={search} className="search">
        <input
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="location"
          id="search-box"
        />
      </form>

      {weather && weather.cod !== "404" && (
        <div className="weather-info">
          <div className="location">
            {weather.name}
            <span> {" " + weather.sys.country}</span>
          </div>

          <div className="degree">
            {Math.round(weather.main.temp)} <span>°C</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
