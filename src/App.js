import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DeleteButton = ({ node }) => {
  const handleDelete = () => {
    console.log("id:", node.data.id);
  };

  return (
    <button onClick={handleDelete}>Удалить</button>
  );
};

function App() {
  const data = [
    { id: "1", name: "Anne", lastName: "Baum", dateOfBirth: new Date('10-20-2000') }
  ];

  const [dataChangeable, setDataChangeable] = useState(data);

  const dateFormatter = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  function formatDate(date) {
    return dateFormatter.format(date);
  }

  const columnDefs = [
    { field: "name",headerName: "Имя ", valueGetter: (params) => `${params.data.name} ${params.data.lastName}`, sortable: true },
    { field: "dateOfBirth", headerName: "Дата рождения", valueGetter: (params) => formatDate(params.data.dateOfBirth) },
    { field: "delit",headerName: "Удалить", cellRenderer: DeleteButton }
  ];

  const SetUser = (user) => {
    setDataChangeable(prev => ([...prev, user]));
  };

  const addNewUser = () => {
    const nameInput = document.querySelector('input[placeholder="Имя"]');
    const lastNameInput = document.querySelector('input[placeholder="Фамилия"]');
    const dayofbirthInput = document.querySelector('input[placeholder="Дата рождения"]');

    const name = nameInput.value;
    const lastName = lastNameInput.value;
    const dateOfBirth = new Date(dayofbirthInput.value);
    
    if(nameInput.value !== "" && lastNameInput.value !== "" && dayofbirthInput.value !== ""){
      SetUser({ id: String(dataChangeable.length + 1), name, lastName, dateOfBirth });
      nameInput.value = ""
      lastNameInput.value = ""
      dayofbirthInput.value = ""
    }else{
      alert("заполни все поля!")
    }
  };

  return (
    <div id="myGrid" className="ag-theme-alpine" style={{ height: '500px' }}>
      <AgGridReact rowData={dataChangeable} columnDefs={columnDefs} />
      <div>
        <input type="text" placeholder="Имя" />
        <br></br>
        <input type="text" placeholder="Фамилия" />
        <br></br>
        <input style={{ width: "100px" }} type="date" placeholder="Дата рождения" />
        <br></br>
        <button onClick={addNewUser}>Добавить</button>
      </div>
    </div>
  );
}

export default App;