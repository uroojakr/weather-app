import { useState } from "react";
import { useQuery } from "react-query";
import { QueryClient } from "react-query";

function Dropdown() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const { isLoading, isError, data, error } = useQuery(
    ["weather", selectedCountry, selectedCity],
    () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},${selectedCountry}&appid=2658819d3c178b5d64c69c779144f597&units=metric`
      ).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return res.json();
      }),
    {
      enabled: selectedCity && selectedCountry,
    }
  );

  if (isLoading) {
    return <div className="loader">Loading...</div>;
  }

  if (isError) {
    return <div className="error-message">{error.message}</div>;
  }

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

      {data && (
        <div className="weather-table">
          <table>
            <tbody>
              <tr>
                <td>Temperature</td>
                <td>{data.main.temp}C</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{data.main.humidity}%</td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{data.main.pressure}hPa</td>
              </tr>
              <tr>
                <td>Wind Speed</td>
                <td>{data.wind.speed}m/s</td>
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
