import './App.css';
import { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import axios from 'axios'
import Landing from './components/Landing';
import Cards from './components/Cards';
import Nav from './components/Nav';
import Form from './components/Form'
import Detail from './components/Detail'
import Pagination from './components/Pagination';
import React from 'react';
 
function App() {
  
  const { pathname } = useLocation();
  const [dogs,setDogs] = useState([])
  const [availableTemperaments, setAvailableTemperaments] = useState([]);

  const onClose = (id) => {
    const parsedId = parseInt(id, 10);
    const filterDogs = dogs.filter((dog) => dog.id !== parsedId);
    setDogs(filterDogs);
  };
    
  const onSearch = async (query) => {
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

      setDogs(results);
    } catch (error) {
      console.error('Error getting dog:', error);
    }
  };

  useEffect(() => {

    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dogs');
        setDogs(response.data); 

        const allTemperaments = response.data.reduce(
          (temperaments, dog) => [...temperaments, ...dog.temperaments],
          []
        );
        const uniqueTemperaments = [...new Set(allTemperaments)];
        setAvailableTemperaments(uniqueTemperaments);
      } catch (error) {
        console.error('Error getting dog data:', error.message);
      }

    };

    getData();
  }, []);


  const renderNav = pathname !== '/';
  
  return (
    <div className="App">
    
    {renderNav && <Nav onSearch={onSearch} />}

      <Routes> 
  
        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Pagination dogs={dogs} onClose={onClose} />} />

        <Route path="/form" element={<Form availableTemperaments={availableTemperaments}/>} />

        <Route path="/detail/:id" element={<Detail />}/>

      </Routes>
      
    </div>
  );
}

export default App;
