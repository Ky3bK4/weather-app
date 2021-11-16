import {useEffect} from "react";

export const useSetCities = (cities) => {
  useEffect(() =>{
    localStorage.setItem('cities', JSON.stringify(cities))
  },[cities])
}