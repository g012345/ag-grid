import React, { useRef, useState } from "react";

const SimpleInput = ({ setUser, dataChangeable }) => {
  const [inputs, setInputs] = useState({
    name: "",
    lastName: "",
    dateOfBirth: "",
  });
  const [error, setError] = useState("");

  const nameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const dateOfBirthInputRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
  };

  const handleAddUserSimpleInput = () => {
    const { name, lastName, dateOfBirth } = inputs;

    if (name.trim() !== "" && lastName.trim() !== "" && dateOfBirth.trim() !== "") {
      if (!isValidDate(dateOfBirth)) {
        setError("Неправильный формат даты!");
        return;
      }

      setUser({
        id: String(dataChangeable.length + 1),
        name,
        lastName,
        dateOfBirth: new Date(dateOfBirth),
      });

      setInputs({
        name: "",
        lastName: "",
        dateOfBirth: "",
      });

      setError("");
    } else {
      setError("Заполните все поля!");
    }
  };

  return (
    <div>
      <h1>Реализация через простой инпут</h1>
      <input
        ref={nameInputRef}
        id="name"
        type="text"
        placeholder="Имя"
        value={inputs.name}
        onChange={handleChange}
      />
      <br />
      <input
        ref={lastNameInputRef}
        id="lastName"
        type="text"
        placeholder="Фамилия"
        value={inputs.lastName}
        onChange={handleChange}
      />
      <br />
      <input
        ref={dateOfBirthInputRef}
        id="dateOfBirth"
        style={{ width: "100px" }}
        type="date"
        placeholder="Дата рождения"
        value={inputs.dateOfBirth}
        onChange={handleChange}
      />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleAddUserSimpleInput}>Добавить</button>
    </div>
  );
};

export default SimpleInput;
