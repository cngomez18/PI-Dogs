// reducer.js
import{FILTER_ORIGIN, FILTER_TEMPERAMENT, SORT_ALPHABETICAL, SORT_WEIGHT, SET_DOGS, SET_SEARCH_RESULTS} from './actionTypes'

const initialState = {
  dogs: [], 
  searchResults: [],
};
  
const reducer = (state = initialState, action) => {
  console.log('Action:', action); // Log the dispatched action
  console.log('Current State:', state); // Log the current state

  switch (action.type) {

    case SET_DOGS:
      console.log('Payload received:', action.payload);

      return {
        ...state,
        dogs: action.payload.dogs,
      };
    
    case FILTER_TEMPERAMENT:
      const targetTemperament = action.payload.temperament[0];
      
      return {
        ...state,
        dogs: state.dogs
        ? state.dogs.filter((dog) => dog.temperaments.includes(targetTemperament))
        : [],
      };
    
    
    case FILTER_ORIGIN:
      const filteredDogsByOrigin = state.dogs.filter(
        (dog) => dog.origin === action.payload.origin
      );
    
      return {
        ...state,
        filteredDogs: filteredDogsByOrigin,
        filters: {
          ...state.filters,
          origin: action.payload.origin,
        },
      };

    case SORT_ALPHABETICAL:
      return {
        ...state,
        dogs: state.dogs ? [...state.dogs].sort((a, b) => a.name.localeCompare(b.name)) : [],
      };

    case SORT_WEIGHT:

      const getAverageWeight = (weightString) => {
        const [min, max] = weightString.split('-').map((val) => parseInt(val.trim()));
        return (min + max) / 2;
      };

      return {
        ...state,
        dogs: state.dogs
          ? [...state.dogs].sort((a, b) => getAverageWeight(a.weight) - getAverageWeight(b.weight))
          : [],
      };

    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload,
    };

    default:
      return state;
  }
};
  
export default reducer;
  