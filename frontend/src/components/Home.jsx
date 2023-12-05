import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Home = () => {

    const url = "http://localhost:8081";
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(url)
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete(`${url}/delete/` + id)
        .then(res => {
            location.reload();
        })
        .catch(err => console.log(err));
    }

  return (
      <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <h2>Data Pegawai</h2>
            <div className='d-flex justify-content-start'>
                <Link to="/create" className='btn btn-success m-2' >Tambah Data (+)</Link>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Telepon</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((pegawai, index) => {
                        return <tr key={index}>
                            <td>{pegawai.id}</td>
                            <td>{pegawai.nama}</td>
                            <td>{pegawai.email}</td>
                            <td>{pegawai.telepon}</td>
                            <td>
                                <Link to={`/detail/${pegawai.id}`} className='btn btn-sm btn-info'>Lihat</Link>
                                <Link to={`/edit/${pegawai.id}`} className='btn btn-sm btn-warning'>Edit</Link>
                                <button onClick={ () => handleDelete(pegawai.id)} className='btn btn-sm btn-danger'>Hapus</button>
                            </td>
                        </tr>
                    })}
                </tbody>

            </table>
        </div>
    </div>
  )
}

export default Home