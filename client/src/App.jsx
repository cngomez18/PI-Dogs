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
import Home from './components/Home';
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
    
 /* const onSearch = (query) => {
    console.log('Search query:', query);
  
    const results = dogs.filter((dog) =>
      dog.name.toLowerCase().includes(query.toLowerCase())
    );
  
    console.log("results:", results);
    setDogs(results);
  };
  */

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
    
    {renderNav && <Nav  />}

      <Routes> 
  
        <Route path="/" element={<Landing />} />

        <Route path="/home" element={<Home dogs={dogs} onClose={onClose} />} />

        <Route path="/form" element={<Form availableTemperaments={availableTemperaments}/>} />

        <Route path="/detail/:id" element={<Detail />}/>

      </Routes>
      
    </div>
  );
}

export default App;
