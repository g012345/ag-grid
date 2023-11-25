import React, { useState } from "react";

const ControlledInputs = ({ setUser, dataChangeable }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastNameInput: "",
    date: ""
  });
  
  const [formErrors, setFormErrors] = useState({
    firstname: false,
    lastNameInput: false,
    date: false
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({...formData,[name]: value});
    setFormErrors({...formErrors, [name]: false});
  };

  const handleAddUserControlledInput = (event) => {
    event.preventDefault();
    const { firstname, lastNameInput, date } = formData;
    const dateOfBirth = new Date(date);

    if (firstname.trim() !== "" && lastNameInput.trim() !== "" && date !== "") {
      setUser({
        id: String(dataChangeable.length + 1),
        name: firstname,
        lastName: lastNameInput,
        dateOfBirth,
      });
      setFormData({
        firstname: "",
        lastNameInput: "",
        date: "",
      });
      setFormErrors({
        firstname: false,
        lastNameInput: false,
        date: false
      });
    } else {
      setFormErrors({
        firstname: firstname.trim() === "",
        lastNameInput: lastNameInput.trim() === "",
        date: date === ""
      });
    }
  };

  return (
    <div>
      <h1>Реализация через controlled inputs</h1>
      <form onSubmit={handleAddUserControlledInput} noValidate>
        <label htmlFor="firstname">Имя</label>
        <br />
        <input
          type="text"
          name="firstname"
          required
          value={formData.firstname}
          onChange={handleInputChange}
        />
        {formErrors.firstname && <span style={{ color: "red" }}>Заполните поле "Имя"</span>}
        <br />
        <label htmlFor="lastNameInput">Фамилия</label>
        <br />
        <input
          type="text"
          name="lastNameInput"
          required
          value={formData.lastNameInput}
          onChange={handleInputChange}
        />
        {formErrors.lastNameInput && <span style={{ color: "red" }}>Заполните поле "Фамилия"</span>}
        <br />
        <label htmlFor="date">Дата рождения</label>
        <br />
        <input
          type="date"
          name="date"
          style={{ width: "100px" }}
          required
          value={formData.date}
          onChange={handleInputChange}
        />
        {formErrors.date && <span style={{ color: "red" }}>Заполните или выберите дату рождения</span>}
        <br />
        <button  type="submit">Add User</button>
      </form>
    </div>
  );
};

export default ControlledInputs;