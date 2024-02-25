import { ADD_FAV, FILTER, REMOVE_FAV, ORDER } from "./actionTypes"

const initialState = {
    myFavorites: [],
    allCharacters: []
}

function reducer(state = initialState, { type, payload }){
    switch(type){
        case 'ADD_FAV':
            return { ...state, myFavorites: payload, allCharacters: payload };
        case 'REMOVE_FAV':
            return { ...state, myFavorites: payload };    
        /*case ADD_FAV:
           return {
            ...state,
            myFavorites:[payload, ...state.allCharacters],
            allCharacters:[payload, ...state.allCharacters]
            case REMOVE_FAV:
                return {
                    ...state,
                    myFavorites: state.myFavorites.filter(char => char.id !== parseInt(payload)),
                allCharacters: state.allCharacters.filter(char => char.id !== payload)
            }
        }*/
        case FILTER:
            const genderFiltered = state.allCharacters.filter(char => char.gender ===payload)

            return {
                ...state,
                myFavorites:payload === 'All' ? state.allCharacters : genderFiltered
            }    
        case ORDER:

            const orderedCharacters = state.myFavorites.sort((a,b)=>{
                if(payload === 'A') return a.id - b.id
                return b.id - a.id
            })

            return {
                ...state,
                myFavorites: [...orderedCharacters]
            }     
        default:
            return state
    }
}

export default reducer