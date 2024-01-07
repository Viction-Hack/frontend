"use client";

import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { PositionsState } from '@/utils/store/features/types';

interface TableData {
  token: string;
  amount: string;
}

interface CollateralTableProps {
  positions: PositionsState;
}

const CollateralTable: React.FC<CollateralTableProps> = ({ positions }) => {
  const columns: Column<TableData>[] = useMemo(
    () => [
      {
        Header: 'Token',
        accessor: 'token',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
      },
    ],
    []
  );

  const data = useMemo(() => {
    return positions.positions.map(position => {
      return {
        token: `${position.token}`,
        amount: `${position.amount} USD`,
      };
    });
  }, [positions]);

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

export default CollateralTable;