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
  const initialData = [
    { id: "1", name: "Anne", lastName: "Baum", dateOfBirth: '10-20-2000' },
    { id: "2", name: "oleg", lastName: "chopa", dateOfBirth: '10-22-1900' },
    { id: "3", name: "egor", lastName: "chin", dateOfBirth: '11-12-1999' },
  ];

  const [data, setData] = useState(initialData);

  const columnDefs = [
    { field: "Имя", valueGetter: (params) => `${params.data.name} ${params.data.lastName}`, filter: true },
    { field: "dateOfBirth", headerName: "Дата рождения" },
    { field: "удалить", cellRenderer: DeleteButton }
  ];

  const addUser = (user) => {
    setData([...data, user]);
  };

  const AddUser = () => {
    const nameInput = document.querySelector('input[placeholder="Имя"]');
    const lastNameInput = document.querySelector('input[placeholder="Фамилия"]');
    const dobInput = document.querySelector('input[placeholder="Дата рождения"]');

    const name = nameInput.value;
    const lastName = lastNameInput.value;
    const dateOfBirth = dobInput.value;

    addUser({ id: String(data.length + 1), name, lastName, dateOfBirth });
  };

  return (
    <div id="myGrid" className="ag-theme-alpine" style={{ height: '500px' }}>
      <AgGridReact rowData={data} columnDefs={columnDefs} />
      <div>
        <input type="text" placeholder="Имя" />
        <br></br>
        <input type="text" placeholder="Фамилия" />
        <br></br>
        <input type="text" placeholder="Дата рождения" />
        <br></br>
        <button onClick={AddUser}>Добавить</button>
      </div>
    </div>
  );
}

export default App;
