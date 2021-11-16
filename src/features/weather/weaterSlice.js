import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchDaily, fetchSearch, fetchHourly } from "./weatherAPI";

const initialState = {
  isLoading: false,
  errorMessage: '',
  formError: '',
  citiesNames: [],
  currentCityStats: {},
  cities: JSON.parse(localStorage.getItem('cities')) || []
};

export const getDay = createAsyncThunk(
  "weather/fetchDaily",
  async (city) => {
  return await fetchDaily(city);
});

export const getHourly = createAsyncThunk(
  "weather/fetchWeakly",
  async (city) => {
    return await fetchHourly(city);
  }
);

export const getQueryResult = createAsyncThunk(
  "weather/searchCityName",
  async (query) => {
    return await fetchSearch(query);
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    deleteCity: (state, action) => {
      state.cities = state.cities.filter(
        (city) => city.location.name !== action.payload.location.name
      );
    },
    clearCities: (state) => {
      state.cities = [];
    },
  },

  extraReducers: {
    [getDay.pending]: (state) => {
      state.errorMessage = '';
      state.formError = ''
      state.isLoading = true;
    },
    [getDay.fulfilled]: (state, action) => {
      state.isLoading = false;
      if(action.payload.error) {
        if(action.payload.error.code === 1006){
          // No match location found
          state.formError = action.payload.error.message;
        }else {
          // Other cases
          state.errorMessage = action.payload.error.message
        }
        return
      }
      // Does the desired city exist in the array?
      const isExist = state.cities.some(el => el.location.name === action.payload.location.name);
      if (!isExist) {
        state.cities.unshift(action.payload);
      }
    },
    [getDay.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
    // accesses
    [getHourly.pending]: (state) => {
      state.errorMessage = "";
      state.isLoading = true;
    },
    [getHourly.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.currentCityStats = action.payload;
    },
    [getHourly.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
    //Search city
    [getQueryResult.pending]: (state) => {
      state.formError = ''
    },
    [getQueryResult.fulfilled]: (state, action) => {
      state.citiesNames = action.payload;
    },
    [getQueryResult.rejected]: (state, action) => {
      console.log(action.error.message);
    },
  },
});

export const { deleteCity, clearCities } = weatherSlice.actions;

//selects
export const selectWeather = state => state.weather;

export default weatherSlice.reducer;
