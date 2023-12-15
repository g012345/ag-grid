import React, { useState } from "react";

const ControlledInputs = ({ setUser, dataChangeable }) => {
  const initialState = {
    firstName: "",
    lastName: "",
    birthDate: ""
  };

  const initialErrors = {
    firstName: "",
    lastName: "",
    birthDate: ""
  };

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState(initialErrors);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const { firstName, lastName, birthDate } = formData;
    const errors = {
      firstName: firstName.trim() === "" ? "Заполните поле 'Имя'" : "",
      lastName: lastName.trim() === "" ? "Заполните поле 'Фамилия'" : "",
      birthDate: birthDate === "" ? "Заполните или выберите дату рождения" : ""
    };
    setFormErrors(errors);
    return Object.values(errors).every(error => error === "");
  };

  const handleAddUserControlledInput = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { firstName, lastName, birthDate } = formData;
      const dateOfBirth = new Date(birthDate);
      setUser({
        id: String(dataChangeable.length + 1),
        name: firstName,
        lastName,
        dateOfBirth
      });
      setFormData(initialState);
    }
  };

  const renderError = (fieldName) => {
    return formErrors[fieldName] && (
      <span style={{ color: "red" }}>{formErrors[fieldName]}</span>
    );
  };

  return (
    <div>
      <h1>Реализация через controlled inputs</h1>
      <form onSubmit={handleAddUserControlledInput} noValidate>
        <label htmlFor="firstName">Имя</label>
        <br />
        <input
          type="text"
          name="firstName"
          required
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {renderError('firstName')}
        <br />
        <label htmlFor="lastName">Фамилия</label>
        <br />
        <input
          type="text"
          name="lastName"
          required
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {renderError('lastName')}
        <br />
        <label htmlFor="birthDate">Дата рождения</label>
        <br />
        <input
          type="date"
          name="birthDate"
          style={{ width: "100px" }}
          required
          value={formData.birthDate}
          onChange={handleInputChange}
        />
        {renderError('birthDate')}
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default ControlledInputs;
