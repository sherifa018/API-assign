import { useState } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=bd8722d3f2adf0316354e1637a1df04c`;

  const searchLocation = (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);

          setLoading(false);
          setLocation("");
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error.message);
          setLoading(false);
        });
    }
  };

  return (
    <div className="con" style={{}}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={searchLocation}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          marginBottom: "20px",
        }}
      />
      {loading && <p>Loading...</p>}
      {data.main && (
        <div>
          <h2>{data.name}</h2>
          <p>
            Temperature: <h1>{data.main.temp}°C</h1>
          </p>
          <p>Weather: {data.weather[0].description}</p>
          <p>Humidity: {data.main.humidity}</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
