import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getWeakly, selectCurrentCityStats, selectLoading} from "../../features/weather/weaterSlice";
import Carousel from 'react-elastic-carousel'
import styles from './City.module.css'
import WeatherHourItem from "../../components/WeatherHourItem/WeatherHourItem";
import {getClassNameForIcon} from "../../utils";
import Loader from "../../components/UI/Loader/Loader";

const City = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const currentCity = useSelector(selectCurrentCityStats)
  const isLoading = useSelector(selectLoading)
  const {current, location, forecast} = currentCity
  const currentDayHours = forecast ? forecast.forecastday[0].hour : null

  useEffect(() => {
    dispatch(getWeakly(params.cityName))
  }, [])


  return (
    <div className={styles.cityPage}>
      {
        //Item display condition
        isLoading
          ? <Loader/>
          :
          current && <>
            <div className={styles.currentWeather}>
              <h1 className={styles.title}>
                {location.name}
              </h1>
              <div className={styles.head}>
                <div className={styles.headIcon}>
                  <i className={`icon-${getClassNameForIcon(current.condition.code)}`}/>
                </div>
                <div className={styles.otherInfo}>
                  <span><i className="icon-cloud-download"/> {current.pressure_mb} mb</span>
                  <span><i className="icon-droplet"/> {current.humidity}%</span>
                  <span><i className="icon-compass2"/> {current.wind_dir}</span>
                  <span><i className="icon-wind"/> {current.wind_kph} km/h</span>
                </div>
                <div className={styles.headInfo}>
              <span className={styles.headTemp}>
                {current.temp_c} &#176;C
              </span>
                  <span>Feels like: {current.feelslike_c} &#176;C</span>
                </div>
              </div>
            </div>
            <div className={styles.hours}>
              <Carousel isRTL={false}
                        itemsToShow={5}
                        pagination={false}
              >
                {
                  currentDayHours.map(hour =>
                    <WeatherHourItem
                      hour={hour}
                      key={hour.time}
                    />)
                }
              </Carousel>
            </div>
          </>
      }

    </div>
  );
};

export default City;