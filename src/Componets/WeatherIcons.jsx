import React,{memo} from "react";
import { FaCloud, FaSun, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const WeatherIcon = ({ weatherCode }) => {
    switch (weatherCode) {
      case 1:
        return <FaSun />;
      case 2:
        return <FaCloud />;
      case 3:
        return <FaCloudRain />;
      case 4:
        return <FaSnowflake />;
      default:
        return <FaCloud />;
    }
  };

  export default React.memo(WeatherIcon);