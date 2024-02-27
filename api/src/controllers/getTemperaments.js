const { Temperament } = require('../db')
const axios = require('axios')

const getTemperaments = async (req, res)=>{
    
    const URL = `https://api.thedogapi.com/v1/breeds/`
    const response = await axios.get(URL)
    
    try{
        const temperamentsAPI = response.data
        .filter((breed) => breed.temperament) //filtra los temps
        .map((breed) => breed.temperament.split(', ')) //separa el array con ,
        .reduce((acc, temperaments) => acc.concat(temperaments), []); //junta los arrays

        await Temperament.bulkCreate(temperamentsAPI.map((name) => ({ name })),)


        const temp = await Temperament.findAll()

        const allTemps = temp.map((t => t.name))

        res.json(allTemps)
    }catch(error){
        res.status(500).send(error.message)
    }
}

module.exports= getTemperaments