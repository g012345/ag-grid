import React from 'react';

const SimpleInput = ({ setUser, dataChangeable }) => {
  const handleAddUserSimpleInput = () => {
    const nameInput = document.querySelector('input[id="firstname"]');
    const lastNameInput = document.querySelector('input[id="lastname"]');
    const dayOfBirthInput = document.querySelector('input[id="DateofBirth"]');

    const name = nameInput.value;
    const lastName = lastNameInput.value;
    const dateOfBirth = new Date(dayOfBirthInput.value);

    if (name !== '' && lastName !== '' && dayOfBirthInput.value !== '') {
      setUser({ id: String(dataChangeable.length + 1), name, lastName, dateOfBirth });
      nameInput.value = '';
      lastNameInput.value = '';
      dayOfBirthInput.value = '';
    } else {
      alert('Заполните все поля!');
    }
  };

  return (
    <div>
      <h1>Реализация через простой инпут</h1>
      <input id="firstname" type="text" placeholder="Имя" />
      <br />
      <input id="lastname" type="text" placeholder="Фамилия" />
      <br />
      <input id="DateofBirth" style={{ width: '100px' }} type="date" placeholder="Дата рождения" />
      <br />
      <button onClick={handleAddUserSimpleInput}>Добавить</button>
    </div>
  );
};

export default SimpleInput;
