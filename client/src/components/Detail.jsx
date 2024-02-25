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
            console.log('Data:', data);
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
    {dog.name ? (
      <div>
        <h2>Name: {dog.name} </h2>
        <h4>Height: {dog.height.metric} cm</h4>
        <h4>Weight: {dog.weight.metric} kg</h4>
        <h4>Temperament: {dog.temperament}</h4>
        <h4>Lifespan: {dog.life_span}</h4>
        <img src={dog.dogImages[0].url} alt={dog.name} />
      </div>
    ) : (
      <p>Loading...</p>
    )}
    </div>
  )
}