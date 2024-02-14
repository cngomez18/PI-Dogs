const { Dog,Temperament, dog_temperament } = require('../db')

const postDogs = async (req, res)=>{
    const { image, name, height, weight, lifespan, temperaments }= req.body

    try{
        if( !image || !name || ! height || !weight || !lifespan || !temperaments){
            return res.status(401).json({ message: "Data missing"})
        }else{
            const newDog = await Dog.findOrCreate({
                where: {
                    image: image,
                    name: name,
                    height: height,
                    weight: weight,
                    lifespan: lifespan,
                }
            })

            const newTemperament = await Temperament.findOrCreate({
                where:{
                    name: temperaments
                }
            })

            await dog_temperament.findOrCreate({
                where: {
                    dogId: newDog.id,
                    temperamentId: newTemperament.id,
                },
            });
        }
        res.status(200).json({newDog})
    }catch{
        res.status(500).json({message: error.message})
    }
}

module.exports = postDogs