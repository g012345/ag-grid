import React, { useState, useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import ControlledInputs from "./component/ControlledInput";
import SimpleInput from "./component/SimpleInput";

const DeleteButton = ({ onDelete, node }) => {
  const handleDelete = () => {
    onDelete(node.data.id);
  };

  return <button onClick={handleDelete}>Удалить</button>;
};

const formatDate = (date) => {
  const dateFormatter = new Intl.DateTimeFormat("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return dateFormatter.format(date);
};

const App = () => {
  const [dataChangeable, setDataChangeable] = useState([]);

  const setUser = (user) => {
    setDataChangeable((prev) => [...prev, user]);
  };

  const onDelete = useCallback((id) => {
    setDataChangeable((prevData) => prevData.filter((item) => item.id !== id));
    console.log("Deleting item with id:", id);
  }, []);

  const columnDefs = useMemo(
    () => [
      {
        field: "name",
        headerName: "Имя",
        valueGetter: (params) => `${params.data.name} ${params.data.lastName}`,
        sortable: true,
        comparator: (valueA, valueB) => {
          let wordsA = valueA.split(" ");
          let wordsB = valueB.split(" ");
          const lastNameA = wordsA[1];
          const lastNameB = wordsB[1];
          return lastNameA > lastNameB ? 1 : -1;
        },
      },
      {
        field: "dateOfBirth",
        headerName: "Дата рождения",
        valueGetter: (params) => formatDate(params.data.dateOfBirth),
      },
      { 
        field: "delete", 
        headerName: "Удалить", 
        cellRenderer: (props) => <DeleteButton onDelete={onDelete} {...props} /> 
      },
    ],
    [onDelete]
  );

  return (
    <div id="myGrid" className="ag-theme-alpine" style={{ height: "500px" }}>
      <AgGridReact rowData={dataChangeable} columnDefs={columnDefs} />
      <SimpleInput setUser={setUser} dataChangeable={dataChangeable} />
      <ControlledInputs setUser={setUser} dataChangeable={dataChangeable} />
    </div>
  );
};

export default App;
