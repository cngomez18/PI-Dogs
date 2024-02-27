import { Link, useLocation } from "react-router-dom";


function Card({ id, onClose, name, weight, temperaments, image }) {
  //console.log("temperaments:", temperaments);
  //console.log("image:", image);
  //console.log("weight:", weight);
 
  const comaTemps = Array.isArray(temperaments) ? temperaments.join(", ") : ''

  const { pathname } = useLocation()

  const displayWeight = typeof weight === 'object'
    ? `${weight.metric} kg` // assuming metric is the property you want to display
    : `${weight} kg`;

  return (
    <div>
     
      {
         pathname === '/home' && <button onClick={() => onClose(id)}>X</button>
      }

      <Link to={`/detail/${id}`}>
        <h2 className="card-name">{name}</h2>
      </Link>

      <h3>{displayWeight}</h3>
      
      <h3>Temperaments:</h3>
      <p>{comaTemps}</p>
    
      <img src={image} alt={name} /> 
    </div>
  );

  
}

export default Card;