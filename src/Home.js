import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('http://100.107.14.48:8081/user')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        setData(data);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://100.107.14.48:8081/postuser', {
        Name: name,
        phone,
        email
      });
      setData([...data, { id: response.data.id, Name: name, phone, email }]); // Thêm người dùng mới vào danh sách
      setName('');
      setPhone('');
      setEmail('');
    } catch (e) {
      console.error('There was an error!', e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://100.107.14.48:8081/deleteuser/${id}`);
      setData(data.filter(user => user.id !== id)); // Xóa người dùng khỏi danh sách
    } catch (e) {
      console.error('There was an error!', e);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center bg-dark h-100'>
      <div className='bg-white rounded w-50'>
        <h2>My CRUD App</h2>
        <h2>Create</h2>

        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td><input type='text' placeholder='Tên' value={name} onChange={(e) => setName(e.target.value)} /></td>
                <td><input type='text' placeholder='Số Điện Thoại' value={phone} onChange={(e) => setPhone(e.target.value)} /></td>
                <td><input type='email' placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                <td><button type='submit'>Thêm</button></td>
              </tr>
            </tbody>
          </table>
        </form>

        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.id}>
                <td>{d.Name}</td>
                <td>{d.phone}</td>
                <td>{d.Email}</td>
                <td>
                  <Link to={`/update/${d.id}`}><button>Sửa</button></Link>
                  <button onClick={() => handleDelete(d.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Home;
