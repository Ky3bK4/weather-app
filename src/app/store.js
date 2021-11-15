import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weaterSlice'
export const store = configureStore({
  reducer: {
    weather: weatherReducer
  },
});
