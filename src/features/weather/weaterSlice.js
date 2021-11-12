import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {fetchDaily, fetchSearch, fetchWeekly} from "./weatherAPI";

const initialState = {
  isLoading: false,
  errorMessage: '',
  inputValue: '',
  citiesNames: [],
  currentCityStats: {},
  cities: JSON.parse(localStorage.getItem('cities')) || []
};


export const getDay = createAsyncThunk(
  'weather/fetchDaily',
  async (city) => {
      return await fetchDaily(city);
  }
);

export const getWeakly = createAsyncThunk(
  'weather/fetchWeakly',
  async (city) => {
    return await fetchWeekly(city);
  }
)

export const getQueryResult = createAsyncThunk(
  'weather/searchCityName',
  async (query) => {
    return await fetchSearch(query);
  }
)

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    deleteCity: (state, action) => {
      state.cities = state.cities.filter(city => city.location.name !== action.payload.location.name)
    },
    clearCities: (state) => {
      state.cities = []
    }
  },

  extraReducers: {
    [getDay.pending] : (state) => {
      state.errorMessage = ''
      state.isLoading = true;
    },
    [getDay.fulfilled] : (state, action) => {
      const isExist = state.cities.some(el => el.location.name === action.payload.location.name)
      if(!isExist) {
        state.cities.unshift(action.payload);
      }
      state.isLoading = false;
    },
    [getDay.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
    [getWeakly.pending] : (state) => {
      state.errorMessage = ''
      state.isLoading = true;
    },
    [getWeakly.fulfilled] : (state, action) => {
      state.isLoading = false;
      state.currentCityStats = action.payload;
    },
    [getWeakly.rejected] : (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
    [getQueryResult.pending] : (state, action) => {
      console.log('loading')
    },
    [getQueryResult.fulfilled] : (state, action) => {
      state.citiesNames = action.payload
    },
    [getQueryResult.rejected] : (state, action) => {
      console.log('error')
    }
  }
});

export const { deleteCity, clearCities } = weatherSlice.actions;


export const selectCities = (state) => state.weather.cities;
export const selectLoading = (state) => state.weather.isLoading;
export const selectErrorMessage = (state) => state.weather.errorMessage;
export const selectCurrentCityStats = (state) => state.weather.currentCityStats;
export const selectCitiesNames = (state) => state.weather.citiesNames;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default weatherSlice.reducer;