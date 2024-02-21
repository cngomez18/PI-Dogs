import { useState } from "react"
import FormValidation from "../FormValidation"
import styles from "../styles/Form-styles.css?inline"

export default function Form({}){

    const [dogData, setDogData] = useState({
        name: '',
        minHeight: '',
        maxHeight: '',
        minWeight: '',
        maxWeight: '',
        lifespan: '',
        temperaments: '',
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setErrors(FormValidation({ ...dogData, [event.target.name]: event.target.value }));
    
            setDogData((oldDogData) => ({
            ...oldDogData,
            [event.target.name]: event.target.value,
        }));
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name">
                    Name:
                    <input type="text" value={dogData.name} id="name" name="name" onChange={handleChange} className={ errors.name && styles.warning }/>
            
                </label>
                
                { errors.name && <p className={styles.danger}> {errors.name} </p> }

                <label htmlFor="minHeight">
                    Minimum Height (cm):
                    <input type="number" value={dogData.minHeight} id="minHeight" name="minHeight" onChange={handleChange} className={ errors.minHeight && styles.warning }/>
                </label>

                { errors.minHeight && <p className={styles.danger}> {errors.minHeight} </p> }

                <label htmlFor="maxHeight">
                    Maximum Height (cm):
                    <input type="number" value={dogData.maxHeight} id="maxHeight" name="maxHeight" onChange={handleChange} className={ errors.maxHeight && styles.warning }/>
                </label>

                { errors.maxHeight && <p className={styles.danger}> {errors.maxHeight} </p> }

                <label htmlFor="minWeight">
                    Minimum Weight (kg):
                    <input type="number" value={dogData.minWeight} id="minWeight" name="minWeight" onChange={handleChange} className={ errors.minWeight && styles.warning }/>
                </label>

                { errors.minWeight && <p className={styles.danger}> {errors.minWeight} </p> }

                <label htmlFor="maxWeight">
                    Maximum Weight (kg):
                    <input type="number" value={dogData.maxWeight} id="maxWeight" name="maxWeight" onChange={handleChange} className={ errors.maxWeight && styles.warning }/>
                </label>

                { errors.maxWeight && <p className={styles.danger}> {errors.maxWeight} </p> }

                <label htmlFor="lifespan">
                    Lifespan (years):
                    <input type="number" value={dogData.lifespan} id="lifespan" name="lifespan" onChange={handleChange} className={ errors.lifespan && styles.warning }/>
                </label>

                { errors.lifespan && <p className={styles.danger}> {errors.lifespan} </p> } 

                <label htmlFor="temperaments">
                    Temperaments :
                    <input type="text" value={dogData.temperaments} id="temperaments" name="temperaments" onChange={handleChange} className={ errors.temperaments && styles.warning }/>
                </label>

                { errors.temperaments && <p className={styles.danger}> {errors.temperaments} </p> } 

                <button type="submit" >
                    Create dog
                </button>
            </form>

            
        </div>  
    )
}