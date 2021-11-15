import { checkStatus } from "../../utils";

export const fetchDaily = async (city) => {
  return await fetch(
    `http://api.weatherapi.com/v1/current.json?key=d6c2f9bbc1b6409ea6872659210911&q=${city}&aqi=no`
  )
    .then(checkStatus)
    .then((res) => res.json())
    .catch((error) => error.response.json());
};

export const fetchWeekly = async (city) => {
  return await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=d6c2f9bbc1b6409ea6872659210911&q=${city}&days=8&aqi=no&alerts=no`
  )
    .then(checkStatus)
    .then((response) => response.json())
    .catch((err) => err.response.json());
};

export const fetchSearch = async (query) => {
  return await fetch(
    `http://api.weatherapi.com/v1/search.json?key=d6c2f9bbc1b6409ea6872659210911&q=${query}`
  )
    .then(checkStatus)
    .then((res) => res.json())
    .catch((error) => error.response.json());
};
