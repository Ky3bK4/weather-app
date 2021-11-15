import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDay,
  getQueryResult,
  selectCities,
  selectCitiesNames, selectFormError,
} from "../../features/weather/weaterSlice";
import styles from "./WeatherForm.module.css";

const WeatherForm = () => {
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);
  const citiesNames = useSelector(selectCitiesNames);
  const formError = useSelector(selectFormError)
  const [valueInput, setValueInput] = useState("");
  const [isShowSearchQuery, setIsShowSearchQuery] = useState(false);

  const handleInput = (e) => {
    const val = e.target.value.trim();
    if (val.length >= 3) {
      dispatch(getQueryResult(val));
    } else {
      setIsShowSearchQuery(false);
    }
    setValueInput(val);
  };


  const handleClick = (e) => {
    setValueInput(e.target.innerText);
    setIsShowSearchQuery(false);
  };

  const addCity = (e) => {
    e.preventDefault();
    const str = valueInput.toLowerCase();
    const isExist = cities.some(
      (p) => p.location.name.toLowerCase() === /^[a-zA-Z]+/.exec(str)[0]
    );
    if (valueInput.length > 0 && !isExist) {
      dispatch(getDay(valueInput.trim()));
      setValueInput("");
      setIsShowSearchQuery(false);
    }
  };

  useEffect(() => {
    if (citiesNames.length > 0 && valueInput.length >= 3) {
      setIsShowSearchQuery(true);
    } else {
      setIsShowSearchQuery(false);
    }
  }, [citiesNames]);

  return (
    <>
      <form onSubmit={addCity} className={styles.form}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="Enter city"
            className={styles.input}
            value={valueInput}
            onChange={handleInput}
          />
          {isShowSearchQuery && (
            <div className={styles.selectQuery}>
              {citiesNames.slice(0, 3).map((city) => (
                <p key={city.id} onClick={handleClick}>
                  {city.name}
                </p>
              ))}
            </div>
          )}
        </div>
        <button type="submit" className={styles.btnAdd}>
          ADD
        </button>
        {formError &&
        <div className={styles.formError}>{formError}</div>}
      </form>
    </>
  );
};

export default WeatherForm;
