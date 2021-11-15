import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getDay, clearCities, selectCities, selectLoading, selectErrorMessage} from "../../features/weather/weaterSlice";
import WeatherItem from "../WeatherItem/WeatherItem";
import styles from './WeatherCities.module.css'
import Loader from "../UI/Loader/Loader";

const WeatherCities = () => {
  const cities = useSelector(selectCities)
  const isLoading = useSelector(selectLoading)
  const errorMessage = useSelector(selectErrorMessage)
  const dispatch = useDispatch();

  useEffect(() =>{
    if(cities.length > 0) {
      dispatch(clearCities());
      for(let i = cities.length-1; i >= 0; i--) {
        dispatch(getDay(cities[i].location.name))
      }
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('cities', JSON.stringify(cities))
  },[cities])

  if(errorMessage) return <div>{errorMessage}</div>

  return (
    <div className={styles.list}>
      {
        isLoading ?
          <Loader />
          : cities.length > 0
          ? cities.map(city =>
            <WeatherItem
              key={city.location.name}
              city={city}
            />
          )
          : <div>Список городов пуст</div>
      }
    </div>
  );
};

export default WeatherCities;