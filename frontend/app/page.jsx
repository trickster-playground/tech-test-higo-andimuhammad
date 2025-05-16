'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import GenderChart from './components/GenderChart';
import { formatAge, formatHour } from './utils/format';
import DataTable from './components/DataTable';


export default function Home() {
  const [users, setUsers] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchPaginatedUsers = async (page = 1) => {
    try {
      const res = await axios.get(`${API_URL}/api/paginated?page=${page}&limit=50`);
      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
    } catch (err) {
      console.error('❌ Failed to fetch paginated users:', err);
    }
  };

  const fetchGenderData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/analytics/gender`);
      setGenderData(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch gender data:', err);
    }
  };

  useEffect(() => {
    fetchPaginatedUsers(page);
    fetchGenderData();
  }, [page]);

  return (
    <div className="p-8 font-sans bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen text-gray-900">
      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-indigo-700 drop-shadow-md">
        <span className="text-4xl">📊</span> Login Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-xl p-8 border border-indigo-100 hover:shadow-indigo-300 transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-6 text-indigo-600 border-b border-indigo-200 pb-2">
            Gender Distribution
          </h2>
          <GenderChart data={genderData} />
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 border border-indigo-100 hover:shadow-indigo-300 transition-shadow duration-300 flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-6 text-indigo-600 border-b border-indigo-200 pb-2">
            Login Summary
          </h2>
          <p className="mb-3 text-lg">
            Showing Page: <span className="font-mono font-bold text-indigo-700">{page}</span> / {totalPages}
          </p>
          <p className="text-lg">
            Total Shown: <span className="font-mono font-bold text-indigo-700">{users.length}</span> users
          </p>
        </div>
      </div>

      <DataTable
        users={users}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>

  );
}
