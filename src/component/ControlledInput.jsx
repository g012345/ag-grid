import React, { useState } from "react";

const ControlledInputs = ({ setUser, dataChangeable }) => {
  const [firstname, setFirstname] = useState("");
  const [lastNameInput, setLastname] = useState("");
  const [date, setDate] = useState("");

  const handleAddUserControlledInput = (e) => {
    e.preventDefault();

    const name = firstname;
    const lastName = lastNameInput;
    const dateOfBirth = new Date(date);

    if (firstname !== "" && lastNameInput !== "" && date !== "") {
      setUser({ id: String(dataChangeable.length + 1), name, lastName, dateOfBirth });
      setFirstname("");
      setLastname("");
      setDate("");
    } else {
      alert("Заполните все поля!");
    }
  };

  return (
    <div>
      <h1>Реализация через controlled inputs</h1>
      <form>
        <label>Имя</label>
        <br />
        <input
          type="text"
          required
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <br />
        <label>Фамилия</label>
        <br />
        <input
          type="text"
          required
          value={lastNameInput}
          onChange={(e) => setLastname(e.target.value)}
        />
        <br />
        <label>Дата рождения</label>
        <br />
        <input
          type="date"
          style={{ width: "100px" }}
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <button onClick={handleAddUserControlledInput}>Add User</button>
      </form>
    </div>
  );
};

export default ControlledInputs;