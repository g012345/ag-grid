import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ControlledInputs from "./component/ControlledInput";
import SimpleInput from "./component/SimpleInput";

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
    { id: "1", name: "Egor", lastName: "Kuzmin", dateOfBirth: new Date("10-20-2000")},
  ];
  const [dataChangeable, setDataChangeable] = useState(data);

  const lastNameComparator = (valueA, valueB) => {
    let wordsA = valueA.split(" ");
    let wordsB = valueB.split(" ");
    const lastNameA = wordsA[1];
    const lastNameB = wordsB[1];

    return lastNameA > lastNameB ? 1 : -1;
  };

  const dateFormatter = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function formatDate(date) {
    return dateFormatter.format(date);
  }

  const columnDefs = [
    {
      field: "name",
      headerName: "Имя ",
      valueGetter: (params) => `${params.data.name} ${params.data.lastName}`,
      sortable: true,
      comparator: lastNameComparator,
    },
    {
      field: "dateOfBirth",
      headerName: "Дата рождения",
      valueGetter: (params) => formatDate(params.data.dateOfBirth),
    },
    { field: "delit", headerName: "Удалить", cellRenderer: DeleteButton },
  ];

  const setUser = (user) => {
    setDataChangeable((prev) => [...prev, user]);
  };

  return (
    <div id="myGrid" className="ag-theme-alpine" style={{ height: "500px" }}>
      <AgGridReact rowData={dataChangeable} columnDefs={columnDefs} />
      <SimpleInput setUser={setUser} dataChangeable={dataChangeable} />
      <ControlledInputs setUser={setUser} dataChangeable={dataChangeable} />
    </div>
  );
}

export default App;