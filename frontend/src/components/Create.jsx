import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

function Create() {

    const url = "http://localhost:8081";

    const [values, setValues] = useState ({
        nama: '',
        email: '',
        telepon: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${url}/pegawai`, values)
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleSubmit}>
                <h2>Tambah Pegawai</h2>
                <div className="mb-2">
                    <label htmlFor="">Nama</label>
                    <input required type="text" placeholder='Masukkan Nama' className='form-control' onChange={e => setValues({...values, nama: e.target.value})} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Masukkan Email' className='form-control' onChange={e => setValues({...values, email: e.target.value})} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Telepon</label>
                    <input type="tel" placeholder='Masukkan No. Telepon' className='form-control' onChange={e => setValues({...values, telepon: e.target.value})} />
                </div>
                <button className='btn btn-success m-1'>Submit</button>
                <Link className='btn btn-secondary m-1' to="/">Batal</Link>
            </form>
        </div>
    </div>
  )
}

export default Create