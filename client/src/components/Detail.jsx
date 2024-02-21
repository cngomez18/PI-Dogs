import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

/*ID.
Imagen.
Nombre.
Altura.
Peso.
Temperamentos.
Años de vida */
export default function Detail(){
  
  const {id} = useParams();
  const [dog, setDog] = useState({});
  useEffect(() => {
      axios(`http://localhost:3001/dogs/${id}`)
      .then(
          ({ data }) => {
            if (data.name) {
                setDog(data);
            } else {
                window.alert('No dogs with that Id');
            }
          }
      );
      return setDog({});
  }, [id]);

  return(
    <div>
    {dog.id === parseInt(id, 10) ?  (
        <div>
          <h2>Name: {dog.name} </h2>
          <h4>Height: {dog.height}</h4>
          <h4>Weight: {dog.weight}</h4>
          <h4>Temperaments: {dog.temperaments}</h4>
          <h4>Lifespan: {dog.lifespan}</h4>
          <img src={dog.image} alt={dog.name} />
        </div>
    ) : (
        <p>
          Dog ID {id} not found
        </p>
    )}
    </div>
  )
}