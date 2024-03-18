import {useState} from "react";

export const useForm = (callback, resetErrors, initialState = {}) => {
    const [values, setValues] = useState(initialState);

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
        // Call the resetErrors callback when the input value changes
        resetErrors();
    };

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    };

    return { onChange, onSubmit, values };
};
