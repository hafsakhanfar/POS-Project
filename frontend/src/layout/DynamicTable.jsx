import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { useState } from "react";
import Pagination from "./Pagination";

const DynamicTable = ({
  data,
  column,
  dataName,
  reRenderTableData,
  EditableRow,
  setData,
}) => {
  const handleDelete = async (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    axios.delete(`http://localhost:5000/${dataName}/${id}`);
  };
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * 5;
  const indexOfFirstRecord = indexOfLastRecord - 5;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / 5);

  return (
    <>
      <table>
        <thead>
          <tr>
            {column.map((item, index) => (
              <th key={index}>{item.heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item) => (
            <TableRow
              item={item}
              column={column}
              key={item.id}
              dataName={dataName}
              reRenderTableData={reRenderTableData}
              EditableRow={EditableRow}
              setData={setData}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

const TableRow = ({
  item,
  column,
  dataName,
  reRenderTableData,
  EditableRow,
  handleDelete,
}) => {
  const [editToggle, setEditToggle] = useState(false);
  const handleCancelClick = () => {
    setEditToggle(false);
  };

  const handleEditForm = async (values, id) => {
    const response = axios
      .patch(`http://localhost:5000/${dataName}/${id}`, { id: id, ...values })
      .then(setEditToggle(false))
      .then(reRenderTableData)
      .catch((error) => {
        console.log(error);
      });
    console.log(response);
  };

  return (
    <tr>
      {editToggle ? (
        <EditableRow
          editFormData={item}
          handleEditForm={handleEditForm}
          handleCancelClick={handleCancelClick}
        />
      ) : (
        column.map((columnItem, index) => {
          if (columnItem.value.includes("image")) {
            return (
              <td key={index}>
                <img
                  className="productImage"
                  placeholder={item.name}
                  src={item[columnItem.value]}
                  alt={item.name}
                />
              </td>
            );
          }

          if (columnItem.value.includes("delete")) {
            return (
              <td key={index}>
                <DeleteOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                />
              </td>
            );
          }

          if (columnItem.value.includes("edit")) {
            return (
              <td key={index}>
                <EditIcon
                  style={{ fill: "#41af4b", cursor: "pointer" }}
                  onClick={() => setEditToggle(true)}
                />
              </td>
            );
          }

          return <td key={index}>{item[columnItem.value]}</td>;
        })
      )}
    </tr>
  );
};

export default DynamicTable;
