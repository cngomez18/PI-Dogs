import Card from './Card';


export default function Cards({dogs,onClose}) {

  return (
  <div>
    
    {dogs.map(dog =>( 
      <Card 
        id={dog.id}
        name={dog.name}
        weight={dog.weight}
        temperaments={dog.temperaments}
        image={dog.image}

        onClose={() => onClose(dog.id.toString())}
      />
    ) )}

  </div>
  )
}
