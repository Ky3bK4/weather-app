import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import weatherReducer from '../features/weather/weaterSlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    weather: weatherReducer
  },
});
