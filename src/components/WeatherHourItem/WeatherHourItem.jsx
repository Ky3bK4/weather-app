import React from 'react';
import styles from './WeatherHourItem.module.css'
import {formatTime, getClassNameForIcon} from "../../utils";

const WeatherHourItem = ({hour}) => {
  return (
    <div className={styles.hour}>
      <span className={styles.dateTime}>{formatTime(hour.time)}</span>
      <div className={styles.hourMainInfo}>
        <div className={styles.hourCondition}>
          <i className={`icon-${getClassNameForIcon(hour.condition.code)}`}/>
        </div>
        <div className={styles.hourTemp}>
          <span>{hour.temp_c} &#176;C</span>
        </div>
      </div>
      <div className={styles.hourOtherInfo}>
        <span><i className="icon-cloud-download"/> {hour.pressure_mb} mb</span>
        <span><i className="icon-droplet"/> {hour.humidity}%</span>
        <span><i className="icon-compass2"/> {hour.wind_dir}</span>
        <span><i className="icon-wind"/> {hour.wind_kph} km/h</span>
      </div>
    </div>
  );
};

export default WeatherHourItem;