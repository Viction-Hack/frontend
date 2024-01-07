import React, { useMemo } from 'react';
import { useTable, Column } from 'react-table';
import { PositionsState } from '@/utils/store/features/types';
import { TokenPrice } from '@/utils/store/features/types';
import { displayTwoDecimalPlaces } from '@/utils/displayTwoDecimalPlaces';

interface TableData {
  token: string;
  amount: string;
}

interface CollateralTableProps {
  positions: PositionsState;
}

let tokenPrices : TokenPrice = {
  'ETH': 2223,
  'DAI': 1,
  'VIC': 0.821,
  'DUSD': 1,
};

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
      const price = tokenPrices[position.token];
      return {
        token: `${position.token}`,
        amount: `${displayTwoDecimalPlaces(Math.abs(position.amount) * price)} USD`,
      };
    });
  }, [positions]);

  const totalValueLocked = useMemo(() => {
    return positions.positions.reduce((total, position) => {
      return total + Math.abs(position.amount) * tokenPrices[position.token];
    }, 0);
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
      <div className="my-4 p-4 rounded shadow-lg bg-white w-full mx-auto">
        <div className="text-l grid grid-cols-2 font-semibold mb-2">
          <div className="text-l font-medium mb-2 ml-2">TVL:</div>
          <div className="text-l font-medium mb-2">{displayTwoDecimalPlaces(totalValueLocked)} USD</div>
        </div>
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-100">
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${index}`}>
                  {headerGroup.headers.map((column, columnIndex) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
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
                  <tr {...row.getRowProps()} key={`row-${rowIndex}`} className="hover:bg-gray-100">
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
      </div>
    </>
  );
}

export default CollateralTable;
