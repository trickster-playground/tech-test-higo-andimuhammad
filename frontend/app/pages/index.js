import axios from 'axios';
import { useEffect, useState } from 'react';
import GenderChart from '../components/GenderChart';

export default function Home() {
  const [logins, setLogins] = useState([]);
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/logins')
      .then(res => setLogins(res.data));

    axios.get('http://localhost:5000/api/logins/analytics/gender')
      .then(res => setGenderData(res.data));
  }, []);

  return (
    <div>
      <h1>Login Data</h1>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Gender</th><th>Age</th><th>Device</th>
          </tr>
        </thead>
        <tbody>
          {logins.map((l, i) => (
            <tr key={i}>
              <td>{l.Name}</td>
              <td>{l.gender}</td>
              <td>{l.Age}</td>
              <td>{l.Brand_Device}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Gender Chart</h2>
      <GenderChart data={genderData} />
    </div>
  );
}
