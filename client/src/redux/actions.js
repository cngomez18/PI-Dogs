import { FILTER_ORIGIN, FILTER_TEMPERAMENT, SORT_ALPHABETICAL, SORT_WEIGHT, SET_DOGS } from "./actionTypes";


export const filterTemperament = (temperament) => ({
    type: FILTER_TEMPERAMENT,
    payload: {
        temperament: temperament, // Make sure it's an array
      },
});
  
export const filterOrigin = (origin) => ({
    type: FILTER_ORIGIN,
    payload: {origin},
});

export const sortAlphabetical = () => ({
    type: SORT_ALPHABETICAL,
});

export const sortWeight = () => ({
    type: SORT_WEIGHT,
});

export const setDogs = (dogs) => ({
    type: SET_DOGS,
    payload: { dogs },
  });
  