import React, { memo } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import WeatherDetail from "./WeatherDetails";

const WeatherCard = ({ latitude, longitude }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);


    function convertTo12HourFormat(time24) {
        const hours = parseInt(time24.split(":")[0]);
        const minutes = time24.split(":")[1];
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12;
        const formattedHours = hours12 === 0 ? 12 : hours12;
        return `${formattedHours}:${minutes} ${ampm}`;
    }


    useEffect(() => {

        const fetchWeatherData = async () => {
            const apiURL = `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&start_date=2025-02-22&end_date=2025-02-26&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,wind_speed_10m_max&timezone=Asia%2FSingapore`;

            try {
                const res = await axios.get(apiURL);

                const dailyData = res.data.daily

                const combinedDailyData = dailyData.weather_code.map((_, index) => {

                    const date = dailyData.sunrise[index].split("T")[0];


                    return {
                        date: date,
                        weather_code: dailyData.weather_code[index],
                        temperature_2m_max: dailyData.temperature_2m_max[index],
                        temperature_2m_min: dailyData.temperature_2m_min[index],
                        wind_speed_10m_max: dailyData.wind_speed_10m_max[index],
                        sunrise: convertTo12HourFormat(dailyData.sunrise[index].split("T")[1]),
                        sunset: convertTo12HourFormat(dailyData.sunset[index].split("T")[1]),
                        

                    };
                });

                console.log(res.data)
                setWeatherData({
                    ...res.data,
                    daily: combinedDailyData
                })
            } catch (error) {
                setError("Error while fetching the data")
            }
        }
        fetchWeatherData()
    }, [latitude, longitude])
    if (error) {
        return <div>{error}</div>
    }
    if (!weatherData) {
        return <div>Please Wait the data is Fetching .....!</div>
    }

    const dailyForecast = weatherData.daily


    return (
        <div className="weather-card">
            <h3>Weather Forecast</h3>
            <div className="location-info">
                <p>Location: Lat {latitude}, Long {longitude}</p>
            </div>
            {dailyForecast.map((day, index) => (
                <WeatherDetail
                    key={index}
                    date={new Date(day.date).toLocaleDateString()}
                    weatherCode={day.weather_code}
                    maxTemp={day.temperature_2m_max}
                    minTemp={day.temperature_2m_min}
                    windSpeed={day.wind_speed_10m_max}
                    sunrise={day.sunrise}
                    sunset={day.sunset}
                />
            ))}
        </div>
    )
}

export default React.memo(WeatherCard);