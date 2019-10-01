import { useState, useEffect } from 'react';

const useForm = (onSubmit, initialValues) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    if (initialValues) setValues({ ...initialValues });
  }, [initialValues]);

  const handleChange = e => {
    let { name, value, type, checked } = e.target;
    value = type === 'checkbox' ? checked : value;
    if (type === 'checkbox') {
      console.log(checked, value);
    }
    // console.log(checked);
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await onSubmit(values);
    setValues({});
  };

  const handleClear = () => {
    setValues({});
  };

  return { values, handleChange, handleSubmit, handleClear };
};

export default useForm;
