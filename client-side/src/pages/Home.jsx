import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Home = () => {
  const [data, setData] = useState(null);

  useEffect(()=>{
    axios.get('http://localhost:3000/api/users/2')
      .then(response => {
        setData(response.data.data);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
  }, []);
  
  return (
    <div className="Home">
        <h1>Selamat datang di HeyJuice!</h1>
        <p>Temukan jus sehat dsaan nikmat di sini!</p>
        <div className="dataUser">
        <h1>Data User</h1>
        {data ? (
          <ul>
            <li><strong>Nama:</strong> {data.nama_lengkap}</li>
            <li><strong>Email:</strong> {data.email}</li>
            <li><strong>Alamat:</strong> {data.alamat}</li>
          </ul>
        ) : (
          <p>Loading...</p>
        )}
      </div>    
      </div>
  );
}

export default Home;
