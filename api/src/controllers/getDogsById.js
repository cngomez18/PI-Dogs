const { Dog, Temperament, dog_temperament }= require('../db')
const axios = require("axios")


const getDogsById = async (req,res)=>{
    const {id} = req.params
    const URL = `https://api.thedogapi.com/v1/breeds/${id}`
    const response = await axios.get(URL)
    
    try{
        //dbdog

        const dogsTemps = await dog_temperament.findAll({
            where: { dogId: id },
            include: [{ model: Temperament, attributes: ['name'] }],
        });

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
            res.status(404).send('Not found, call a hound')
        }

    }catch(error){
        res.status(500).send(error.message)
    }
}


module.exports= getDogsById;