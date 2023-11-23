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
    { id: "1", name: "11", lastName: "aaaa", dateOfBirth: new Date('10-20-2000')},
    { id: "2", name: "1", lastName: "zzz", dateOfBirth: new Date('10-20-2000')},
    { id: "3", name: "111", lastName: "z", dateOfBirth: new Date('10-20-2000')},
    { id: "4", name: "1111", lastName: "aaaaa", dateOfBirth: new Date('10-20-2000')},
    { id: "5", name: "1111", lastName: "zzz", dateOfBirth: new Date('10-20-2000')},
    { id: "6", name: "11", lastName: "nnnnnnn", dateOfBirth: new Date('10-20-2000')},
    { id: "7", name: "22", lastName: "bbbb", dateOfBirth: new Date('10-20-2000')},
    { id: "8", name: "2", lastName: "yyy", dateOfBirth: new Date('10-20-2000')},
    { id: "9", name: "222", lastName: "y", dateOfBirth: new Date('10-20-2000')},
    { id: "10", name: "2222", lastName: "bbbbb", dateOfBirth: new Date('10-20-2000')},
    { id: "11", name: "2222", lastName: "yyy", dateOfBirth: new Date('10-20-2000')},
    { id: "12", name: "22", lastName: "mmmmmmm", dateOfBirth: new Date('10-20-2000')},
    { id: "13", name: "33", lastName: "cccc", dateOfBirth: new Date('10-20-2000')},
    { id: "14", name: "3", lastName: "xxx", dateOfBirth: new Date('10-20-2000')},
    { id: "15", name: "333", lastName: "x", dateOfBirth: new Date('10-20-2000')},
    { id: "16", name: "3333", lastName: "ccccc", dateOfBirth: new Date('10-20-2000')},
    { id: "17", name: "3333", lastName: "xxx", dateOfBirth: new Date('10-20-2000')},
    { id: "18", name: "33", lastName: "nnnnnnn", dateOfBirth: new Date('10-20-2000')},
    { id: "19", name: "44", lastName: "dddd", dateOfBirth: new Date('10-20-2000')},
    { id: "20", name: "4", lastName: "www", dateOfBirth: new Date('10-20-2000')}
  ];
  const [dataChangeable, setDataChangeable] = useState(data);
  const lastNameComparator = (valueA, valueB) => {
    let wordsA = valueA.split(" ")
    let wordsB = valueB.split(" ")
    const lastNameA = wordsA[1];
    const lastNameB = wordsB[1]; 
  
    return (lastNameA > lastNameB) ? 1 : - 1;
  };
  
  
  const dateFormatter = new Intl.DateTimeFormat('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  function formatDate(date) {
    return dateFormatter.format(date);
  }

  const columnDefs = [
    {field: "name",
      headerName: "Имя ", 
      valueGetter: (params) => `${params.data.name} ${params.data.lastName}`, 
      sortable: true,
      comparator: lastNameComparator },
    {field: "dateOfBirth",
      headerName: "Дата рождения",
      valueGetter: (params) => formatDate(params.data.dateOfBirth) },
    {field: "delit",
      headerName: "Удалить", 
      cellRenderer: DeleteButton }
  ];

  const SetUser = (user) => {
    setDataChangeable(prev => ([...prev, user]));
  };

  const addNewUserSimplInput = () => {
    const nameInput = document.querySelector('input[id="firstname"]');
    const lastNameInput = document.querySelector('input[id="lastname"]');
    const dayofbirthInput = document.querySelector('input[id="DateofBirth"]');

    const name = nameInput.value;
    const lastName = lastNameInput.value;
    const dateOfBirth = new Date(dayofbirthInput.value);
    
    if(nameInput.value !== "" && lastNameInput.value !== "" && dayofbirthInput.value !== ""){
      SetUser({ id: String(dataChangeable.length + 1), name, lastName, dateOfBirth });
      nameInput.value = ""
      lastNameInput.value = ""
      dayofbirthInput.value = ""
      console.log(dataChangeable)
    }else{
      alert("заполни все поля!")
    }
  };


  return (
    <div id="myGrid" className="ag-theme-alpine" style={{ height: '500px' }}>
      <AgGridReact rowData={dataChangeable} columnDefs={columnDefs} />
      <div>
        <h1>реализация через простой инпут</h1>
        <input id="firstname" type="text" placeholder="Имя" />
        <br></br>
        <input id="lastname" type="text" placeholder="Фамилия" />
        <br></br>
        <input id="DateofBirth" style={{ width: "100px" }} type="date" placeholder="Дата рождения" />
        <br></br>
        <button onClick={addNewUserSimplInput}>Добавить</button>
      </div>
      <div>
        <h1>реализация через controlled inputs</h1>
        <form>
          <label></label>
        </form>
      </div>
      <div>
        <h1>реализация через formik</h1>

      </div>
      <div>
        <h1>реализация через ag-grid</h1>

      </div>
    </div>
  );
}

export default App;