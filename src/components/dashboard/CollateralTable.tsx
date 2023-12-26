"use client";

import { useMemo } from 'react';
import { useTable, Column } from 'react-table';

interface TableData {
  asset: string;
  amount: string;
  value: string;
}

export default function CollateralTable() {
  // Define columns for the table
  const columns: Column<TableData>[] = useMemo(
    () => [
      {
        Header: 'Asset',
        accessor: 'asset', 
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
      {
        Header: 'Value',
        accessor: 'value',
      },
    ],
    []
  );

  // Define data for the table
  const data = useMemo(
    () => [
      {
        asset: 'Bitcoin',
        amount: '2 BTC',
        value: '$40,000',
      },
      {
        asset: 'Bitcoin',
        amount: '2 BTC',
        value: '$40,000',
      },
      {
        asset: 'Bitcoin',
        amount: '2 BTC',
        value: '$40,000',
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <>
      <div className="bg-white overflow-hidden">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${index}`}>
                {headerGroup.headers.map((column, columnIndex) => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    key={`column-${columnIndex}`}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={`row-${rowIndex}`}>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap"
                      key={`cell-${rowIndex}-${cellIndex}`}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}