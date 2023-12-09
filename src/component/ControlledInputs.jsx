import React, { useState } from 'react';

const ControlledInputs = ({ setUser, dataChangeable }) => {
  const [firstname, setFirstname] = useState('');
  const [lastNameInput, setLastname] = useState('');
  const [date, setDate] = useState('');

  const addNewUserControlledInput = (e) => {
    e.preventDefault();

    const name = firstname;
    const lastName = lastNameInput;
    const dateOfBirth = new Date(date);

    if (!firstname || !lastNameInput || !date || isNaN(dateOfBirth.getTime())) {
      alert('Заполните все поля корректно!');
      return;
    }

    setUser({ id: String(dataChangeable.length + 1), name, lastName, dateOfBirth });
    setFirstname('');
    setLastname('');
    setDate('');
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
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <br />
        <label>Last name:</label>
        <br />
        <input
          type="text"
          required
          value={lastNameInput}
          onChange={(e) => setLastname(e.target.value)}
        />
        <br />
        <label>Date of birth:</label>
        <br />
        <input
          type="date"
          style={{ width: '100px' }}
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <button onClick={addNewUserControlledInput}>Add User</button>
      </form>
    </div>
  );
};

export default ControlledInputs;
