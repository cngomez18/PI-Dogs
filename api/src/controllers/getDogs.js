const { Dog }= require('../db')

const getDogs = async (req,res)=>{
    let dogs = [];
    
    try{
        dogs = await Dog.findAll()

        const dogBreeds = dogs.map((doggy => doggy.name))

        res.json(dogBreeds)
    }catch(error){
        res.status(500).send(error.message)
    }
}


module.exports= getDogs;