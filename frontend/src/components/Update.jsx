import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Update = () => {

  const url = "http://localhost:8081";
  
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${url}/detail/` + id)
    .then(res => {
        console.log(res);
        setValues({...values, 
          nama: res.data[0].nama, 
          email: res.data[0].email, 
          values, telepon: res.data[0].telepon
        })
    })
    .catch(err => console.log(err))
}, [])

  const [values, setValues] = useState ({
    nama: '',
    email: '',
    telepon: ''
  })

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put(`${url}/update/` + id, values)
    .then(res => {
      console.log(res);
      navigate('/');
    })
    .catch(err => console.log(err));
  };

  return (
    <div className='d-flex vh-100 bg-dark justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={handleUpdate}>
                <h2>Edit Pegawai</h2>
                <div className="mb-2">
                    <label htmlFor="">Nama</label>
                    <input required type="text" placeholder='Masukkan Nama' className='form-control' value={values.nama} onChange={e => setValues({...values, nama: e.target.value})} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Masukkan Email' className='form-control' value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Telepon</label>
                    <input type="tel" placeholder='Masukkan No. Telepon' className='form-control' value={values.telepon} onChange={e => setValues({...values, telepon: e.target.value})} />
                </div>
                <button className='btn btn-success m-1'>Update</button>
                <Link className='btn btn-secondary m-1' to="/">Batal</Link>
            </form>
        </div>
    </div>
  )
}

export default Update