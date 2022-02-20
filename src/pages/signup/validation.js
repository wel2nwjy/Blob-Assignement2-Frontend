function validation(inputValues){
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!inputValues.username) {
        errors.username = "Username is required";
    }
    if (!inputValues.email) {
        errors.email = "Email is required";
    }
    else if (!regex.test(inputValues.email)) {
        errors.email = "Email is invalid";
    }
    if (!inputValues.password) {
        errors.password = "Password is required";
    }
    else if (inputValues.password.length < 6) {
        errors.password = "Password is too short";
    }
    else if (!inputValues.confirm_password) {
        errors.confirm_password = "Enter the same Password to continue";
    }    
    else if (inputValues.password!==inputValues.confirm_password) {
        errors.confirm_password = "Passwords are not same.Please Re-Enter";
    }

    return errors;
}

export default validation;