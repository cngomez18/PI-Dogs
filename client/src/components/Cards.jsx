import Card from './Card';
import { connect, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { filterTemperament, filterOrigin, sortAlphabetical, sortWeight, setDogs  } from '../redux/actions.js';

function Cards({ dogs, onClose, applySortWeight, applyFilterOrigin, applyFilterTemperament, applySortAlphabetical, applySetDogs}) {
 
  console.log('Received Props:', { dogs });


  const dispatch = useDispatch(); // Get the dispatch function from react-redux

  const [allDogs, setAllDogs] = useState([]);
  const [temperaments, setTemperaments] = useState([]); // State to store temperaments
 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dogs/');
        const dogsData = response.data;
        setAllDogs(dogsData); // Use setAllDogs to update the state
        dispatch(setDogs(dogsData))

        const resTemps = await axios.get('http://localhost:3001/temperaments/');
        const tempData = resTemps.data;

        setTemperaments(tempData.slice(0, 10));

      } catch (error) {
        console.error('Error mess:', error);
      }
    };
  
    fetchData(); // Call the function to fetch data when the component mounts
  }, []);


  const handleFilterTemp = (e) => {
    const selectedTemperament = e.target.value;
  
    if (selectedTemperament === 'reset') {
      dispatch(setDogs(allDogs));
    } else {
      dispatch(filterTemperament([selectedTemperament]));
    }
  };


  return (
    <div>

      <select onChange={handleFilterTemp}>
      <option value="reset">Temperaments</option>
        {temperaments.slice(0, 10).map((temperament, index) => (
          <option key={index} value={temperament}>
            {temperament}
          </option>
        ))}
      </select>


      <button onClick={() => applyFilterOrigin(dogs[0]?.origin)}>
        Filter by Origin
      </button>

      <button onClick={applySortAlphabetical}>Sort Alphabetically</button>

      <button onClick={applySortWeight}>Sort by Weight</button>



      {dogs.map(dog =>( 
        <Card 
          key={dog.id}
          id={dog.id}
          name={dog.name}
          weight={dog.weight}
          temperaments={dog.temperaments}
          image={dog.image}
          onClose={() => onClose(dog.id)}
        />
      ) )}

    </div>
  )
}
const mapStateToProps = (state) => {
  console.log('Mapped State:', state);
  return {
    dogs: state.dogs,
  };
};


const mapDispatchToProps = (dispatch) => ({
  applyFilterTemperament: (temperament) => dispatch(filterTemperament(temperament)),
  applyFilterOrigin: (origin) => dispatch(filterOrigin(origin)),
  applySortAlphabetical: () => dispatch(sortAlphabetical()),
  applySortWeight: () => dispatch(sortWeight()),
  applySetDogs: (dogs) => dispatch(setDogs(dogs)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Cards);