const { Router } = require('express');
const postDogs = require('../controllers/postDogs')
const getDogs = require('../controllers/getDogs')
const getDogsById = require('../controllers/getDogsById')
const getDogName = require('../controllers/getDogName')
const getTemperaments = require('../controllers/getTemperaments')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
 

const router = Router();
router.get('/dogs', getDogs)
router.get('/dogs/:id', getDogsById)
router.get('dogs/name?="...',getDogName)
router.post('/dogs', postDogs)
router.get('/temperaments', getTemperaments)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
