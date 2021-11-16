import React from 'react';
import styles from './WeatherItem.module.css'
import {deleteCity} from "../../features/weather/weaterSlice";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {getClassNameForIcon} from "../../utils";

const WeatherItem = ({city}) => {
  const dispatch = useDispatch();
  const {location, current} = city
  const pathname = location.name.toLowerCase()

  const removeCity = (e) => {
    e.preventDefault();
    dispatch(deleteCity(city))
  }

  return (
    <Link to={`/${pathname}`}>
      <div
        className={styles.item}
      >
        {/*Overview*/}
        <div className={styles.head}>
          <div className={styles.headIcon}>
            <i className={`icon-${getClassNameForIcon(current.condition.code)}`}/>
          </div>

          <div className={styles.headInfo}>
          <span className={styles.headTemp}>
            {current.temp_c} &#176;C
          </span>
            <span className={styles.headCondition}>
            {current.condition.text}
          </span>
          </div>
        </div>

        {/*City name*/}
        <h3 className={styles.itemTitle}>
          {location.name}
        </h3>

        {/*Advanced info*/}
        <div className={styles.otherInfo}>
          <span>Feels like: {current.feelslike_c} &#176;C</span>
          <span><i className="icon-cloud-download"/> {current.pressure_mb} mb</span>
          <span><i className="icon-droplet"/> {current.humidity}%</span>
          <span><i className="icon-compass2"/> {current.wind_dir}</span>
          <span><i className="icon-wind"/> {current.wind_kph} km/h</span>
        </div>

        <button
          className={styles.btnDelete}
          aria-label={`Delete ${location.name}`}
          onClick={removeCity}
        >
          <i className="icon-bin2"/>
        </button>
      </div>
    </Link>

  );
};

export default WeatherItem;