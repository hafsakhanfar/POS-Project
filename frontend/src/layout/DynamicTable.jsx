import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';




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

const DynamicTable = ({ data, column }) => {
  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => (
            <TableHeadItem item={item} key={index} />
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <TableRow item={item} column={column} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};

const TableHeadItem = ({ item }) => <th>{item.heading}</th>;
const TableRow = ({ item, column }) =>{
  
  const handleDelete = ()=>{

    
  }
  
  
  return(
  <tr>
    {column.map((columnItem, index) => {
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
             <EditIcon/>
          </td>
        );
      }

      return <td key={index}>{item[columnItem.value]}</td>;
    })}
  </tr>
);

}




export default DynamicTable;
