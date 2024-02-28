import React from 'react';
import Nav from './Nav';
import Pagination from './Pagination';
import '../styles/Home-styles.css'; 

const Home = ({dogs, onClose}) => {
    
  return (
    <div className="home-container">

      <Pagination dogs={dogs} onClose={onClose} />
      
    </div>
  );
};

export default Home;
