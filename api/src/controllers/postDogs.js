const { Dog } = require('../db');

const postDog = async (req, res) => {
  try {

    // Extract data from request body
    const {
      name,
      height,
      weight,
      lifespan,
      temperaments,
    } = req.body;

    if (!name || !height || !weight || !lifespan || !temperaments ) {
        return res.status(400).json({ error: 'All fields are required.' });
    }


    // Create a new dog in the database
    const newDog = await Dog.create({
      name,
      height,
      weight,
      lifespan,
      temperaments,
    
    });

    res.status(201).json(newDog);
  } catch (error) {
    console.error('Error creating dog:', error);
    res.status(500).send(error.message);
  }
};

module.exports = postDog;

/*const { Dog, Temperament, dog_temperament } = require('../db')

const postDogs = async (req, res)=>{

    let newDog;
    let newTemperament;

    const { image, name, height, weight, lifespan, temperaments }= req.body

    try{
        if( !image || !name || ! height || !weight || !lifespan || !temperaments){
            return res.status(401).json({ message: "Data missing"})
        }else{
            newDog = await Dog.create({
                image: image,
                name: name,
                height: height,
                weight: weight,
                lifespan: lifespan,
            });
            
           // console.log('New Dog:', newDog);

            /*const newTemperament = await Temperament.create({
                name: temperaments
                
            })
             [newTemperament, created] = await Temperament.findOrCreate({
                where: {
                    name: temperaments,
                },
                defaults: {
                    name: temperaments,
                },
            });

            //console.log('New Temperament:', newTemperament);
            //console.log('Created:', created);

            try {
                await dog_temperament.create({
                    dogId: newDog.id,
                    temperamentId: newTemperament.id,
                });
            } catch (error) {
                console.error('Error in dog_temperament.create:', error);
            }
            /*await dog_temperament.create({
            
                dogId: newDog.id,
                temperamentId: newTemperament.id,
            
            });
            console.log('New Temperament:', newTemperament);
        }
        //res.status(200).json({newDog})
        res.status(201).json({
            id: newDog.id,
            image: newDog.image,
            name: newDog.name,
            height: newDog.height,
            weight: newDog.weight,
            lifespan: newDog.lifespan,
            temperament: newTemperament.name,
          })
    }catch(error){
        
        console.error('Error in postDogs:', error);
        res.status(500).json({message: error.message})
    }
}

module.exports = postDogs*/