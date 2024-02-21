export default function validation(dogData){
    const regexOnlyLetters = /^[a-zA-Z\s-]+$/

    const regexPosNumbersAndNotLess = /^[1-9]\d*(\.\d+)?$/

    const regexPosNumbers = /^[1-9]\d*$/

    const regexIsNotEmpty = /^\S+$/

    const errors = {}
    
  /*name: '',
    minHeight: ''
    maxHeight: ''
    minWeight: ''
    maxWeight: ''
    lifespan: ''
    temperaments: '' */

    if (!regexOnlyLetters.test(dogData.name)) {
        errors.name = 'Invalid name. Please use only letters, spaces, and hyphens.';
    }

    if (!regexOnlyLetters.test(dogData.temperaments)) {
        errors.temperaments = 'Invalid temperaments. Please use only letters, spaces, and hyphens.';
    }

    if (!regexPosNumbers.test(dogData.lifespan)) {
        errors.lifespan = 'Invalid lifespan. Please enter a positive number.';
    }

    if (!regexPosNumbersAndNotLess.test(dogData.minHeight) || !regexPosNumbersAndNotLess.test(dogData.maxHeight) || parseInt(dogData.minHeight, 10) > parseInt(dogData.maxHeight, 10)) {
        errors.height = 'Invalid height. Please enter positive numbers, and make sure min values are less than max values.';
    }
    
    if (!regexPosNumbersAndNotLess.test(dogData.minWeight) || !regexPosNumbersAndNotLess.test(dogData.maxWeight) || parseInt(dogData.minWeight, 10) > parseInt(dogData.maxWeight, 10)) {
        errors.weight = 'Invalid weight. Please enter positive numbers, and make sure min values are less than max values.';
    }

    for (const key in dogData) {
        if (!regexIsNotEmpty.test(dogData[key])) {
          errors[key] = 'Field cannot be empty.';
        }
    }
      

    return errors


}

