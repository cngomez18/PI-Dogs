const { Dog } = require('../db')
const { Op } = require('sequelize')

const getDogName = async (req, res)=> {
    const { name } = req.query

    try{

        const doggyRes = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
        });

        if(!doggyRes || doggyRes.length === 0){
            res.status(404).json({message: 'Not Found'})
        }else{
            res.status(200).json(doggyRes)
        }
    }catch(error){
        res.status(500).send(error.message)
    }
}

module.exports = getDogName;