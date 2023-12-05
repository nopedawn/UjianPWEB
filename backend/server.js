import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

// MEMBUAT KONEKSI DATABASE
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ujian_pweb"
})

// TAMPILKAN DATA PADA Home.jsx
app.get('/', (req, res) => {
    const sql = "SELECT * FROM pegawai";
    db.query(sql, (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

// CREATE DATA
app.post('/pegawai', (req, res) => {
    const sql = "INSERT INTO pegawai (`nama`, `email`, `telepon`) VALUES (?)";
    console.log(req.body);
    const values = [
        req.body.nama,
        req.body.email,
        req.body.telepon
    ]
    db.query(sql, [values], (err, result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

// READ DATA
app.get('/detail/:id', (req, res) => {
    const sql = "SELECT * FROM pegawai WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

// UPDATE DATA
app.put('/update/:id', (req, res) => {
    const sql = "UPDATE pegawai SET `nama`=?, `email`=?, `telepon`=? WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [req.body.nama, req.body.email, req.body.telepon, id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

// DELETE DATA
app.delete('/delete/:id', (req, res) => {
    const sql = "DELETE FROM pegawai WHERE id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

// KONEKSIKAN PORT & DATABASE
app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
})