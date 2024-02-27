import { FILTER_ORIGIN, FILTER_TEMPERAMENT, SORT_ALPHABETICAL, SORT_WEIGHT, SET_DOGS, SET_SEARCH_RESULTS } from "./actionTypes"
import axios from "axios";

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

export const setSearchResults = (results) => (

    {
        type: SET_SEARCH_RESULTS,
        payload: results,
    }
)
  
export const searchDogs = (query) => async (dispatch) => {
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/breeds');
  
      const allBreeds = response.data.map((breed) => ({
        id: breed.id,
        name: breed.name,
        weight: breed.weight?.metric,
        temperaments: breed.temperament?.split(', ') || [],
        image: `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`,
      }));
  
      const results = allBreeds.filter((breed) =>
        breed.name.toLowerCase().includes(query.toLowerCase())
      );
  
      dispatch(setSearchResults(results));
    } catch (error) {
      console.error('Error getting dog:', error);
    }
  };