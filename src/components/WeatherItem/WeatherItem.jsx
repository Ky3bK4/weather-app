import React from 'react';
import styles from './WeatherItem.module.css'
import {deleteCity} from "../../features/weather/weaterSlice";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {getClassNameForIcon} from "../../utils";

const WeatherItem = ({city}) => {
  const weather = city.current;
  const location = city.location
  const dispatch = useDispatch();

  const removeCity = (e) => {
    e.preventDefault();
    dispatch(deleteCity(city))
  }

  return (
    <Link to={`/${city.location.name.toLowerCase()}`}>
      <div
        className={styles.item}
      >
        {/*Overview*/}
        <div className={styles.head}>
          <div className={styles.headIcon}>
            <i className={`icon-${getClassNameForIcon(weather.condition.code)}`}/>
          </div>

          <div className={styles.headInfo}>
          <span className={styles.headTemp}>
            {weather.temp_c} &#176;C
          </span>
            <span className={styles.headCondition}>
            {weather.condition.text}
          </span>
          </div>
        </div>

        {/*City name*/}
        <h3 className={styles.itemTitle}>
          {location.name}
        </h3>

        {/*Advanced info*/}
        <div className={styles.otherInfo}>
          <span>Feels like: {weather.feelslike_c} &#176;C</span>
          <span><i className="icon-cloud-download"/> {weather.pressure_mb} mb</span>
          <span><i className="icon-droplet"/> {weather.humidity}%</span>
          <span><i className="icon-compass2"/> {weather.wind_dir}</span>
          <span><i className="icon-wind"/> {weather.wind_kph} km/h</span>
        </div>

        <button
          className={styles.btnDelete}
          onClick={removeCity}
        >
          <i className="icon-bin2"/>
        </button>
      </div>
    </Link>

  );
};

export default WeatherItem;