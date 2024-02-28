import Card from './Card';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Cards.css'
import { filterTemperament, filterOrigin, sortAlphabetical, sortWeight, setDogs, searchDogs, setCurrentPage } from '../redux/actions.js';

function Cards({ dogs, onClose, searchResults ,applySortWeight, applyFilterOrigin, applyFilterTemperament, applySortAlphabetical, applySetDogs, applySearchDogs, currentPage, setCurrentPage, totalPages}) {
 
  console.log('Received Props in Cards:', { dogs });


  const dispatch = useDispatch(); // Get the dispatch function from react-redux

  const [allDogs, setAllDogs] = useState([]);
  const [temperaments, setTemperaments] = useState([]); // State to store temperaments
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dogs/');
        const dogsData = response.data;
        console.log("ddata: ", dogsData)
        setAllDogs(dogsData);
        dispatch(setDogs(dogsData))

        const resTemps = await axios.get('http://localhost:3001/temperaments/');
        const tempData = resTemps.data;

        setTemperaments(tempData.slice(0, 10));

      } catch (error) {
        console.error('Error mess:', error);
      }
    };
  
    fetchData(); 
  }, []);

  useEffect(() => {
    dispatch(setDogs(searchResults));
  }, [searchResults]);

  const handleFilterTemp = (e) => {
    const selectedTemperament = e.target.value;
  
    if (selectedTemperament === 'reset') {
      dispatch(setDogs(allDogs));
    } else {
      dispatch(filterTemperament([selectedTemperament]));
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  return (
    
    <div >
      <div className="filter-bar">

        <select onChange={handleFilterTemp}>
          <option value="reset">Temperaments</option>
            {temperaments.slice(0, 10).map((temperament, index) => (
              <option key={index} value={temperament}>
                {temperament}
              </option>
            ))}
        </select>

        {/*<button onClick={() => applyFilterOrigin(dogs[0]?.origin)}>
          Filter by Origin
        </button>*/}

        <button onClick={applySortAlphabetical}>Sort Alphabetically</button>

        <button onClick={applySortWeight}>Sort by Weight</button>
      </div>

      <br/>
      <div className="cards-container">
        {dogs.map(dog =>( 
          <div key={dog.id} >
            <Card 
              id={dog.id}
              name={dog.name}
              weight={dog.weight}
              temperaments={dog.temperaments}
              image={dog.image}
              onClose={() => onClose(dog.id)}
            />
          </div>
        ) )}
      </div>
       
       
    </div>
  )
}
const mapStateToProps = (state) => {
  console.log("state:",state.dogs)
  return {
    dogs: state.dogs,
    searchResults: state.searchResults,
    currentPage: state.currentPage,
  };
};


const mapDispatchToProps = (dispatch) => ({
  applyFilterTemperament: (temperament) => dispatch(filterTemperament(temperament)),
 // applyFilterOrigin: (origin) => dispatch(filterOrigin(origin)),
  applySortAlphabetical: () => dispatch(sortAlphabetical()),
  applySortWeight: () => dispatch(sortWeight()),
  applySetDogs: (dogs) => dispatch(setDogs(dogs)),
  applySearchDogs: (query) => dispatch(searchDogs(query)),
  setCurrentPage: (page) => dispatch(setCurrentPage(page)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Cards);