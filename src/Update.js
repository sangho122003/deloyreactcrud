import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Update() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8081/user/${id}`)
      .then(response => {
        const user = response.data;
        setName(user.Name);
        setPhone(user.phone);
        setEmail(user.Email);
      })
      .catch(error => console.error('There was an error!', error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/updateuser/${id}`, {
        Name: name,
        phone,
        email
      });
      // Redirect or update the state after success
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />
        <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Phone' />
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
        <button type='submit'>Update</button>
      </form>
    </div>
  );
}

export default Update;
