const { Dog }= require('../db')
const axios = require("axios")

const getDogs = async (req,res)=>{
    const { id } = req.params;
    const URL = `https://api.thedogapi.com/v1/breeds/`
    const response = await axios.get(URL)
    
    
    try {
        const dogsDB = await Dog.findAll();
        
        const dogsAPI = await response.data.map( (apiDog) => {
            //console.log('API Dog:', apiDog);
            //console.log('Weight:', apiDog.weight?.metric);
            //console.log('Temperament:', apiDog.temperament);
            return{
                id: apiDog.id,
                name: apiDog.name,
                weight: apiDog.weight.metric || 'N/A',
                temperaments: apiDog.temperament?.split(', ') || [],
                image:`https://cdn2.thedogapi.com/images/${apiDog.reference_image_id}.jpg`
        }});
        
        
        const allDogs = [...dogsDB, ...dogsAPI]
        res.json(allDogs);
    
    }catch(error){
        console.error('Error in getDogs:', error);
        res.status(500).send(error.message)
    }
}


module.exports= getDogs;