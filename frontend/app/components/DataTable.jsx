import React from 'react';
import { formatAge, formatHour } from '../utils/format';

export default function DataTable({ users, page, totalPages, setPage }) {
  const headers = [
    'Name',
    'Location',
    'Gender',
    'Age - (Birth Year)',
    'Login Hour',
    'Brand Device',
    'Digital Interest',
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 border border-indigo-100 hover:shadow-indigo-300 transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-6 text-indigo-600 border-b border-indigo-200 pb-2">
        Login Data Table
      </h2>

      <div className="overflow-auto max-h-[520px] rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-indigo-100 sticky top-0 z-20">
            <tr>
              {headers.map((title) => (
                <th
                  key={title}
                  className="border-b border-indigo-300 px-6 py-3 font-semibold text-indigo-700 tracking-wide select-none"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr
                key={i}
                className={`${i % 2 === 0 ? 'bg-white' : 'bg-indigo-50'
                  } hover:bg-indigo-200 transition-colors duration-200 cursor-pointer`}
              >
                <td className="border-b border-indigo-200 px-6 py-3">{u.Name}</td>
                <td className="border-b border-indigo-200 px-6 py-3">{u.Name_of_Location}</td>
                <td className="border-b border-indigo-200 px-6 py-3 capitalize">{u.gender}</td>
                <td className="border-b border-indigo-200 px-6 py-3">
                  {formatAge(u.Age)} - <span>[{u.Age}]</span>
                </td>
                <td className="border-b border-indigo-200 px-6 py-3">{formatHour(u.Login_Hour)}</td>
                <td className="border-b border-indigo-200 px-6 py-3">{u.Brand_Device}</td>
                <td className="border-b border-indigo-200 px-6 py-3">{u.Digital_Interest}</td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan={headers.length} className="text-center py-6 text-indigo-400 italic">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
        >
          Prev
        </button>

        <span className="font-medium text-indigo-700">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
