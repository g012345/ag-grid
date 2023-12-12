import React, { useState } from 'react';

const ControlledInputs = ({ setUser, dataChangeable }) => {
  const [user, setUserState] = useState({
    firstname: '',
    lastNameInput: '',
    date: '',
  });

  const { firstname, lastNameInput, date } = user;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserState({
      ...user,
      [name]: value,
    });
  };

  const addNewUserControlledInput = (e) => {
    e.preventDefault();

    const dateOfBirth = new Date(date);

    if (!firstname || !lastNameInput || !date || isNaN(dateOfBirth.getTime())) {
      alert('Заполните все поля корректно!');
      return;
    }

    const newUser = {
      id: String(dataChangeable.length + 1),
      name: firstname,
      lastName: lastNameInput,
      dateOfBirth,
    };

    setUser(newUser);
    setUserState({ firstname: '', lastNameInput: '', date: '' });
  };

  return (
    <div>
      <h1>Реализация через controlled inputs</h1>
      <form>
        <label>First name:</label>
        <br />
        <input
          type="text"
          required
          name="firstname"
          value={firstname}
          onChange={handleInputChange}
        />
        <br />
        <label>Last name:</label>
        <br />
        <input
          type="text"
          required
          name="lastNameInput"
          value={lastNameInput}
          onChange={handleInputChange}
        />
        <br />
        <label>Date of birth:</label>
        <br />
        <input
          type="date"
          style={{ width: '100px' }}
          required
          name="date"
          value={date}
          onChange={handleInputChange}
        />
        <br />
        <button onClick={addNewUserControlledInput}>Add User</button>
      </form>
    </div>
  );
};

export default ControlledInputs;
