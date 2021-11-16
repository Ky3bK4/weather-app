import React from 'react';
import {useSelector} from "react-redux";
import {selectWeather} from "../../features/weather/weaterSlice";
import WeatherItem from "../WeatherItem/WeatherItem";
import styles from './WeatherCities.module.css'
import Loader from "../UI/Loader/Loader";
import {useLoadCities} from "../../hooks/useLoadCities";
import {useSetCities} from "../../hooks/useSetCities";

const WeatherCities = () => {
  const {cities, isLoading, errorMessage} = useSelector(selectWeather);

  useLoadCities(cities);
  useSetCities(cities);

  if(isLoading) return <Loader />
  if(errorMessage) return <div>{errorMessage}</div>

  return (
    <div className={styles.list}>
      {
        cities.length > 0
          ? cities.map(city =>
              <WeatherItem
                key={city.location.name}
                city={city}
            />)
          : <div>The list of cities is empty</div>
      }
    </div>
  );
};

export default WeatherCities;