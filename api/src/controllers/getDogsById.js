const { Dog, Temperament, dog_temperament } = require('../db');
const axios = require('axios');

const getDogsById = async (req, res) => {
  const { id } = req.params;
  const dogURL = `https://api.thedogapi.com/v1/breeds/${id}`;
  const dogImageURL = `https://api.thedogapi.com/v1/images/search?breed_ids=${id}`;

  try {
    const dogResponse = await axios.get(dogURL);

    if (dogResponse.data) {
      const { id: ID, image, name, height, weight, life_span, temperament, origin } = dogResponse.data;

      const dogImageResponse = await axios.get(dogImageURL);

      // Combine information from API and database
      const dogDetail = {
        ID,
        image,
        name,
        height,
        weight,
        life_span,
        temperament,
        origin,
        // Extract relevant dog image information
        dogImages: dogImageResponse.data,
      };

      res.json(dogDetail);
    } else {
      // Handle the case where the dog is not found
      res.status(404).send('Not found');
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error in getDogsById:', error);
    res.status(500).send(error.message);
  }
};

module.exports = getDogsById;


/*const axios = require('axios');
const { Dog, Temperament}= require('../db')


const getDogsById = async (req, res) => {
  const { id } = req.params;
  const URL = `https://api.thedogapi.com/v1/breeds/${id}`;

  try {
    // Fetch dog details from the external API
    const response = await axios.get(URL);

    if (response.data) {
      // Extract relevant data from the API response
      const { ID, image, name, height, weight, lifespan } = response.data;

      // Create an object with the extracted data
      const dogDetail = {
        ID,
        image,
        name,
        height,
        weight,
        lifespan,
        // Include any other relevant data or transformations

        // Temperament handling could be similar to your previous logic
        // Example:
        // temperament: dogsTemps.map((temp) => temp.Temperament.name),
      };

      // Send the data as JSON response
      res.json(dogDetail);
    } else {
      // Handle the case where the dog is not found
      res.status(404).send('Not found');
    }
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error in getDogsById:', error);
    res.status(500).send(error.message);
  }
};



const { Dog, Temperament, dog_temperament }= require('../db')
const axios = require("axios")


const getDogsById = async (req,res)=>{
    const {id} = req.params
    const URL = `https://api.thedogapi.com/v1/breeds/${id}`
    const response = await axios.get(URL)
    
    try{
        //dbdog
        const dogDB = await Dog.findByPk(id);
      

        console.log('Dog from DB:', dogDB);

        console.log('Before findAll');

        const dogsTemps = await dog_temperament.findAll({
            where: { dogId: id },
            include: [{ model: Temperament, attributes: ['name'] }],
        });
        
        console.log('After findAll', dogsTemps);
  
        //apidog
        if(response.data){
            const {ID, image, name, height, weight, lifespan} = response.data
            
            const dogDetail = {
                ID,
                image,
                name,
                height,
                weight,
                lifespan,
                temperament: dogsTemps.map(temp => temp.Temperament.name),
            };
           
            res.json(dogDetail)
        }else{
            res.status(404).send('Not found')
        }

    }catch(error){
        console.error('Error in getDogsById:', error);
        res.status(500).send(error.message)
    }
}
*/

//module.exports= getDogsById;