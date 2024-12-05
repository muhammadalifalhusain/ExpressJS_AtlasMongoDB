// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const Barang = require('./models/Barang');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb+srv://user1:urTHQOPLOaBXEwZL@latihan1.4vpdp.mongodb.net/latihan1?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// Route untuk menambah barang
app.post('/barang', async(req, res) => {
    try {
        const { nama, harga, stok } = req.body;

        const barang = new Barang({
            nama,
            harga,
            stok,
        });

        await barang.save();
        res.status(201).json(barang);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route untuk mendapatkan semua barang
app.get('/barang', async(req, res) => {
    try {
        const barang = await Barang.find();
        res.status(200).json(barang);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route untuk mengupdate barang berdasarkan ID
app.put('/barang/:id', async(req, res) => {
    try {
        const { nama, harga, stok } = req.body;
        const barang = await Barang.findByIdAndUpdate(req.params.id, { nama, harga, stok }, { new: true });
        res.status(200).json(barang);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Route untuk menghapus barang berdasarkan ID
app.delete('/barang/:id', async(req, res) => {
    try {
        const barang = await Barang.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Barang berhasil dihapus' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Menjalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});