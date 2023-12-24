import React from 'react';
import { Column, useTable } from 'react-table';

export const columnData = [
  {
    accessor: 'name',
    Header: 'Name',
  },
  {
    accessor: 'amount',
    Header: 'Amount',
  },
  {
    accessor: 'total_deposited',
    Header: 'Total Deposited',
  }
];


// export function Table ({ columns: Column, data })  {
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow
//   } = useTable({
//     columns,
//     data
//   });

//   return (
//     <table {...getTableProps()} className="w-full">
//       <thead className="bg-gray-100">
//         {headerGroups.map(headerGroup => (
//           <tr {...headerGroup.getHeaderGroupProps()} className="border-b border-gray-200">
//             {headerGroup.headers.map(column => (
//               <th {...column.getHeaderProps()} className="p-3 text-sm font-medium text-gray-900 uppercase tracking-wider">
//                 {column.render('Header')}
//               </th>
//             ))}
//           </tr>
//         ))}
//       </thead>
//       <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
//         {rows.map(row => {
//           prepareRow(row);
//           return (
//             <tr {...row.getRowProps()}>
//               {row.cells.map(cell => {
//                 return (
//                   <td {...cell.getCellProps()} className="p-3">
//                     {cell.render('Cell')}
//                   </td>
//                 );
//               })}
//             </tr>
//           );
//         })}
//       </tbody>
//     </table>
//   );
// }