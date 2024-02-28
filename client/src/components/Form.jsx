import { useState } from "react"
import FormValidation from "../FormValidation"
import styles from "../styles/Form.css?inline"
import '../styles/Form.css'
import axios from 'axios'

export default function Form({ availableTemperaments }){

    const [dogData, setDogData] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        lifespan: '',
        temperaments: [],
    });
    

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setErrors(FormValidation({ ...dogData, [event.target.name]: event.target.value }));
    
            setDogData((oldDogData) => ({
            ...oldDogData,
            [event.target.name]: event.target.value,
        }));
    };
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Dog Data:', dogData);
        try {
            const height = `${dogData.minHeight}-${dogData.maxHeight}`;

            const weight = `${dogData.minWeight}-${dogData.maxWeight}`;

            // Create a new object with the combined values
            const fullDogData = {
            name: dogData.name,
            height,
            weight,
            lifespan: dogData.lifespan,
            temperaments: dogData.temperaments,
            };


            const response = await axios.post('http://localhost:3001/dogs', fullDogData);
      
            // Check if the creation was successful
            if (response.status === 201) {
              // Dog created successfully
              window.alert('Dog created successfully!');
              // Additional logic if needed...
            } else {
              window.alert('Failed to create dog. Please try again.');
            }
          } catch (error) {
            
            console.error('Error creating dog:', error);
            window.alert('Error creating dog. Please try again.');
          }
    };

    const handleTemperamentsChange = (selectedTemperaments) => {
        setDogData({
          ...dogData,
          temperaments: selectedTemperaments,
        });
    };
    
    const toggleTemperament = (temperament) => {
        if (dogData.temperaments.includes(temperament)) {
          return dogData.temperaments.filter((temp) => temp !== temperament);
        } else {
          return [...dogData.temperaments, temperament];
        }
    };
      
      

    return(
        <div className='form-body'>
        <div className="card-container">
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">
                    Name:
                    <input type="text" value={dogData.name} id="name" name="name" onChange={handleChange} className={ errors.name && styles.warning }/>
            
                </label>

                <br/>

                { errors.name && <p className={styles.danger}> {errors.name} </p> }


                <label htmlFor="minHeight">
                    Minimum Height (cm):
                    <input type="number" value={dogData.minHeight} id="minHeight" name="minHeight" onChange={handleChange} className={ errors.minHeight && styles.warning }/>
                </label>
                
                <br/>

                { errors.height && <p className={styles.danger}> {errors.height} </p> }

                <label htmlFor="maxHeight">
                    Maximum Height (cm):
                    <input type="number" value={dogData.maxHeight} id="maxHeight" name="maxHeight" onChange={handleChange} className={ errors.maxHeight && styles.warning }/>
                </label>

                <br/>

                { errors.height && <p className={styles.danger}> {errors.height} </p> }

                <label htmlFor="minWeight">
                    Minimum Weight (kg):
                    <input type="number" value={dogData.minWeight} id="minWeight" name="minWeight" onChange={handleChange} className={ errors.minWeight && styles.warning }/>
                </label>

                <br/>

                { errors.weight && <p className={styles.danger}> {errors.weight} </p> }

                <label htmlFor="maxWeight">
                    Maximum Weight (kg):
                    <input type="number" value={dogData.maxWeight} id="maxWeight" name="maxWeight" onChange={handleChange} className={ errors.maxWeight && styles.warning }/>
                </label>

                <br/>

                { errors.weight && <p className={styles.danger}> {errors.weight} </p> }

                <label htmlFor="lifespan">
                    Lifespan (years):
                    <input type="number" value={dogData.lifespan} id="lifespan" name="lifespan" onChange={handleChange} className={ errors.lifespan && styles.warning }/>
                </label>

                <br/>

                { errors.lifespan && <p className={styles.danger}> {errors.lifespan} </p> } 

                <label>
                    Temperaments:
                </label>

                <div className='temperament-container'>

                    {availableTemperaments.map((temperament) => (
                    <div key={temperament} className='temperament-checkbox'>
                        <input
                        type="checkbox"
                        id={temperament}
                        name="temperaments"
                        value={temperament}
                        checked={dogData.temperaments.includes(temperament)}
                        onChange={() => handleTemperamentsChange(toggleTemperament(temperament))}
                        />
                        <label htmlFor={temperament}>{temperament}</label>
                    </div>
                    ))}
                
                </div>

                <br/>
                
                { errors.temperaments && <p className={styles.danger}> {errors.temperaments} </p> } 

                <button type="submit" >
                    Create dog
                </button>
            </form>

            
        </div>  
        </div>
    )
}