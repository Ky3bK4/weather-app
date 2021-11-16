import {useEffect} from "react";
import {clearCities, getDay} from "../features/weather/weaterSlice";
import {useDispatch} from "react-redux";

export const useLoadCities = (cities) => {
  const dispatch = useDispatch()
  useEffect(() =>{
    if(cities.length > 0) {
      dispatch(clearCities());
      for(let i = cities.length - 1; i >= 0; i--) {
        dispatch(getDay(cities[i].location.name))
      }
    }
  },[])
}