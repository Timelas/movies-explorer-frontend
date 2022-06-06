import React from 'react'
import validation from './formValidation'

function СallbackValidation() {
    const [values,setValues] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [isValid, setIsValid]= React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)

    const onFocus = () => {
        setIsFocused(true)
    }

    const handleChange = (e) => {
        const {target} = e;
        const {name} = target;
        const {value} = target;
        const error = validation(name, value);
        setErrors(validation(name, value));
        setValues({...values, [name]: value})
        if(Object.keys(error).length === 0){
            setIsValid(target.closest('form').checkValidity())
        }
    }


    const resetForm = React.useCallback(
        (newErrors = {}, newIsValid = false) => {
          setErrors(newErrors);
          setIsValid(newIsValid);
        },
        [setErrors, setIsValid]
      );


    return {values, handleChange, errors, isValid, onFocus, isFocused, setValues, resetForm}
}

export default СallbackValidation;