import React, { useEffect } from "react";
import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getHourly,
  selectWeather,
} from "../../features/weather/weaterSlice";
import { getClassNameForIcon } from "../../utils";
import Loader from "../../components/UI/Loader/Loader";
import WeatherHourItem from "../../components/WeatherHourItem/WeatherHourItem";
import Carousel from "react-elastic-carousel";


const City = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const {currentCityStats, isLoading} = useSelector(selectWeather)
  const { current, location, forecast, error } = currentCityStats;
  const currentDayHours = forecast ? forecast.forecastday[0].hour : null;

  const breakPoints = [
    { width: 320, itemsToShow: 3 },
    { width: 478, itemsToShow: 4 },
    { width: 634, itemsToShow: 5, itemsToScroll: 3 },
    { width: 782, itemsToShow: 6, itemsToScroll: 6 },
    { width: 1010, itemsToShow: 8, itemsToScroll: 8 },
  ]

  useEffect(() => {
    dispatch(getHourly(params.cityName));
  }, []);


  if(isLoading) return <Loader/>
  if(error) return <div>{error.message}</div>

  return (
    <div className={styles.cityPage}>
      {
       current &&
            <>
              <div className={styles.currentWeather}>
                <h1 className={styles.title}>{location.name}</h1>
                <div className={styles.head}>
                  <div className={styles.headIcon}>
                    <i
                      className={`icon-${getClassNameForIcon(
                        current.condition.code
                      )}`}
                    />
                  </div>
                  <div className={styles.infoWrapper}>
                    <div className={styles.otherInfo}>
                    <span>
                      <i className="icon-cloud-download" />{" "}
                      {current.pressure_mb} mb
                    </span>
                      <span>
                      <i className="icon-droplet" /> {current.humidity}%
                    </span>
                      <span>
                      <i className="icon-compass2" /> {current.wind_dir}
                    </span>
                      <span>
                      <i className="icon-wind" /> {current.wind_kph} km/h
                    </span>
                    </div>
                    <div className={styles.headInfo}>
                    <span className={styles.headTemp}>
                      {current.temp_c} &#176;C
                    </span>
                      <span>Feels like: {current.feelslike_c} &#176;C</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.hours}>
                <Carousel
                  isRTL={false}
                  breakPoints={breakPoints}
                  showArrows={false}
                >
                  {
                    currentDayHours.map( hour => <WeatherHourItem hour={hour} key={hour.time} />)
                  }
                </Carousel>
              </div>
            </>
      }
    </div>
  );
};

export default City;
