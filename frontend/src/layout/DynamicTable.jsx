import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { useState, useMemo } from "react";
import Pagination from "./pagination/Pagination";

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
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 6;
    const lastPageIndex = firstPageIndex + 6;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, data]);

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
          {currentTableData.map((item) => (
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
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={data.length}
        pageSize={6}
        onPageChange={(page) => setCurrentPage(page)}
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
                <img placeholder="hi" src={item[columnItem.value]} />
              </td>
            );
          }

          if (columnItem.value.includes("delete")) {
            return (
              <td key={index}>
                <ClearIcon onClick={handleDelete} />
              </td>
            );
          }

          if (columnItem.value.includes("edit")) {
            return (
              <td key={index}>
                <EditIcon onClick={() => setEditToggle(true)} />
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
