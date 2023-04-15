import React, { useState, useEffect } from "react";

function Dropdown() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCity("");
    setWeatherData(null);
    setError(null);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  useEffect(() => {
    if (selectedCity) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},${selectedCountry}&appid=2658819d3c178b5d64c69c779144f597
&units=metric`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          return response.json();
        })
        .then((data) => setWeatherData(data))
        .catch((error) => setError(error.message));
    }
  }, [selectedCity, selectedCountry]);

  return (
    <div className="dropdown-container">
      <label htmlFor="country">Select a country: </label>
      <select
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        <option value="">--Select Country</option>
        <option value="Pakistan">Pakistan</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="Japan">Japan</option>
      </select>

      {selectedCountry && (
        <div>
          <label htmlFor="city">Select a city:</label>
          <select id="city" value={selectedCity} onChange={handleCityChange}>
            <option value="">--Select City</option>
            {selectedCountry === "Pakistan" && (
              <>
                <option value="Islamabad">Islamabad</option>
                <option value="Lahore">Lahore</option>
              </>
            )}
            {selectedCountry === "Saudi Arabia" && (
              <>
                <option value="Mecca">Mecca</option>
                <option value="Medina">Medina</option>
              </>
            )}
            {selectedCountry === "Japan" && (
              <>
                <option value="Tokyo">Tokyo</option>
                <option value="Osaka">Osaka</option>
              </>
            )}
          </select>
        </div>
      )}

      {weatherData && (
        <div className="weather-table">
          <table>
            <tbody>
              <tr>
                <td>Temperature</td>
                <td>{weatherData.main.temp}C</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{weatherData.main.humidity}%</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{weatherData.main.pressure}hPa</td>
              </tr>
              <tr>
                <td>Wind Speed</td>
                <td>{weatherData.wind.speed}m/s</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Dropdown;
