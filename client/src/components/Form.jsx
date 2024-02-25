import { useState } from "react"
import FormValidation from "../FormValidation"
import styles from "../styles/Form-styles.css?inline"
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
            // Make API request to create a dog
            // Combine minHeight and maxHeight into a single height field
            const height = `${dogData.minHeight}-${dogData.maxHeight}`;

            // Combine minWeight and maxWeight into a single weight field
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
              // Handle other status codes if needed
              window.alert('Failed to create dog. Please try again.');
            }
          } catch (error) {
            // Handle API request error
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
        <div>
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

                { errors.minHeight && <p className={styles.danger}> {errors.minHeight} </p> }

                <label htmlFor="maxHeight">
                    Maximum Height (cm):
                    <input type="number" value={dogData.maxHeight} id="maxHeight" name="maxHeight" onChange={handleChange} className={ errors.maxHeight && styles.warning }/>
                </label>

                <br/>

                { errors.maxHeight && <p className={styles.danger}> {errors.maxHeight} </p> }

                <label htmlFor="minWeight">
                    Minimum Weight (kg):
                    <input type="number" value={dogData.minWeight} id="minWeight" name="minWeight" onChange={handleChange} className={ errors.minWeight && styles.warning }/>
                </label>

                <br/>

                { errors.minWeight && <p className={styles.danger}> {errors.minWeight} </p> }

                <label htmlFor="maxWeight">
                    Maximum Weight (kg):
                    <input type="number" value={dogData.maxWeight} id="maxWeight" name="maxWeight" onChange={handleChange} className={ errors.maxWeight && styles.warning }/>
                </label>

                <br/>

                { errors.maxWeight && <p className={styles.danger}> {errors.maxWeight} </p> }

                <label htmlFor="lifespan">
                    Lifespan (years):
                    <input type="number" value={dogData.lifespan} id="lifespan" name="lifespan" onChange={handleChange} className={ errors.lifespan && styles.warning }/>
                </label>

                <br/>

                { errors.lifespan && <p className={styles.danger}> {errors.lifespan} </p> } 

                <label>
                    Temperaments:
                    {availableTemperaments.map((temperament) => (
                        <div key={temperament}>
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
                </label>

                <br/>
                
                { errors.temperaments && <p className={styles.danger}> {errors.temperaments} </p> } 

                <button type="submit" >
                    Create dog
                </button>
            </form>

            
        </div>  
    )
}