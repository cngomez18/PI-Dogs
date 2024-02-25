import { ADD_FAV, REMOVE_FAV, FILTER, ORDER } from "./actionTypes";
import axios from 'axios'

export const addFav = (character) => {
    const endpoint = 'http://localhost:3001/rickandmorty/fav';

    return async (dispatch) => {
       try{
        const response= await axios.post(endpoint, character)
        const {data}=response

        dispatch({
           type: 'ADD_FAV',
           payload: data,
        });
       }catch(error){
        console.log(error.message)
       }
    };
};

export const removeFav = (id) => {
   const endpoint = 'http://localhost:3001/rickandmorty/fav/' + id;
  
   return async (dispatch) => {
    try{
        const response= await axios.delete(endpoint)
        const {data}= response
        dispatch({
            type: 'REMOVE_FAV',
            payload: data,
      })

    }catch(error){
        console.log(error.message)
    }
   };
};

export const filterCards = (gender)=>(
    {
        type: FILTER,
        payload: gender
    }
)

export const orderCards = (orden)=>(
    {
        type: ORDER,
        payload: orden
    }
)

/*export const addFav = (character) => (
    {
        type: ADD_FAV,
        payload: character
    }
)*/

/*export const removeFav = (id) => (
    {
        type: REMOVE_FAV,
        payload: id
    }
)*/
