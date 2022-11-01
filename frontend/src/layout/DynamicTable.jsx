import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import { useState } from "react";
import Pagination from "./Pagination";

// function DynamicTable({ TableData }) {
//   // get table column
//   const column = Object.keys(TableData[0]);
//   // get table heading data
//   const ThData = () => {
//     return column.map((data) => {
//       return <th key={data}>{data}</th>;
//     });
//   };
//   // get table row data
//   const tdData = () => {
//     return TableData.map((data) => {
//       return (
//         <tr key={data.id}>
//           {column.map((v) => {
//             return <td >{data[v]}</td>;
//           })}
//         </tr>
//       );
//     });
//   };

//   return (
//     <table className="table">
//       <thead>
//         <tr>{ThData()}</tr>
//       </thead>
//       <tbody>{tdData()}</tbody>
//     </table>
//   );
// }
// export default DynamicTable;
// export default function DynamicTable({ tbodyData, theadData }) {
//   return (
//     <table>
//         <thead>
//            <tr>
//             {theadData.map(heading => {
//               return <th key={heading}>{heading}</th>
//             })}
//           </tr>
//         </thead>
//         <tbody>
//             {tbodyData.map((row, index) => {
//                 return <tr key={index}>
//                     {theadData.map((key, index) => {
//                          return <td key={row[key]}>{row[key]}</td>
//                     })}
//               </tr>;
//             })}
//         </tbody>
//     </table>
//  );
//  }

const DynamicTable = ({
  data,
  column,
  dataName,
  reRenderTableData,
  EditableRow,
}) => {
  // const [currentPage, setCurrentPage] = useState(1);
  // const firstPageIndex = (currentPage - 1) * 6;
  // const lastPageIndex = firstPageIndex + 6;
  // const currentTableData = data.slice(firstPageIndex, lastPageIndex);

  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastRecord = currentPage * 6;
  const indexOfFirstRecord = indexOfLastRecord - 6;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / 6);

  return (
    <>
      <table>
        <thead>
          <tr>
            {column.map((item, index) => (
              <TableHeadItem item={item} key={index} />
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

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;

const TableRow = ({
  item,
  column,
  dataName,
  reRenderTableData,
  EditableRow,
}) => {
  const [editToggle, setEditToggle] = useState(false);
  const handleCancelClick = () => {
    setEditToggle(false);
  };

  const handleEditForm = async (values, id) => {
    axios
      .patch(`http://localhost:5000/${dataName}/${id}`, { id: id, ...values })
      .then(setEditToggle(false))
      .then(reRenderTableData)
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = async () => {
    axios
      .delete(`http://localhost:5000/${dataName}/${item.id}`)
      .then(reRenderTableData);
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
                <DeleteOutlineIcon onClick={handleDelete} />
              </td>
            );
          }

          if (columnItem.value.includes("edit")) {
            return (
              <td key={index}>
                <EditIcon style={{ fill: "#41af4b" }} onClick={() => setEditToggle(true)} />
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
