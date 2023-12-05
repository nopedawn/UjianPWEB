import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const Read = () => {

    const url = "http://localhost:8081";

    const {id} = useParams();
    const [pegawai, setPegawai] = useState([]);
    useEffect(() => {
        axios.get(`${url}/detail/` + id)
        .then(res => {
            console.log(res);
            setPegawai(res.data[0]);
        })
        .catch(err => console.log(err))
    }, [])
  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
        <div className='w-25 bg-white rounded p-3'>
            <h2>Informasi Pegawai</h2>
            <br />
            <h5>ID: {pegawai.id}</h5>
            <h5>Nama: {pegawai.nama}</h5>
            <h5>Email: {pegawai.email}</h5>
            <h5>Telepon: {pegawai.telepon}</h5>
            <br />
            <Link to="/" className='btn btn-secondary m-1'>← Kembali</Link>
        </div>
    </div>
  )
}

export default Read