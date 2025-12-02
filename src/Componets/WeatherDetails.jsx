import React,{memo} from "react";
import WeatherIcon from "./WeatherIcons";

const WeatherDetail = ({ date, weatherCode, maxTemp, minTemp, windSpeed,sunrise,sunset }) =>{
    return (
        <div className="forecast">
          <p style={{borderBottom:"1px solid black"}}><b>{date}</b></p>
          <div className="weather-icon">
            <WeatherIcon weatherCode={weatherCode} />
          </div>
          <p>Max Temp: {maxTemp}°C | Min Temp: {minTemp}°C</p>
          <p>Wind Speed: {windSpeed} km/h</p>
          <p>Sunrise:{sunrise} | Sunset:{sunset}</p>
        </div>
      );
}
export default React.memo(WeatherDetail);
